"""Создание заказа: сохраняет заказ и позиции в БД"""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    email = body.get("email", "").strip()
    items = body.get("items", [])

    if not name or not phone or not items:
        return {
            "statusCode": 400,
            "headers": cors,
            "body": json.dumps({"error": "Укажите имя, телефон и товары"}, ensure_ascii=False),
        }

    total = sum(item.get("price", 0) * item.get("quantity", 1) for item in items)

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO orders (customer_name, customer_phone, customer_email, status, total) VALUES (%s, %s, %s, 'new', %s) RETURNING id",
        (name, phone, email, total),
    )
    order_id = cur.fetchone()[0]

    for item in items:
        cur.execute(
            "INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (%s, %s, %s, %s, %s)",
            (order_id, item.get("product_id"), item.get("product_name"), item.get("quantity", 1), item.get("price", 0)),
        )

    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"ok": True, "order_id": order_id}, ensure_ascii=False),
    }
