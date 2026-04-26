"""Получение списка товаров с фильтрацией по категории, бренду и цене"""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    params = event.get("queryStringParameters") or {}
    category_slug = params.get("category")
    brand = params.get("brand")
    price_min = params.get("price_min")
    price_max = params.get("price_max")
    search = params.get("search")

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    query = """
        SELECT p.id, p.name, p.description, p.price, p.price_old,
               p.image_url, p.specs, p.brand, p.in_stock,
               c.name as category_name, c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE 1=1
    """
    args = []

    if category_slug:
        query += " AND c.slug = %s"
        args.append(category_slug)
    if brand:
        query += " AND p.brand = %s"
        args.append(brand)
    if price_min:
        query += " AND p.price >= %s"
        args.append(float(price_min))
    if price_max:
        query += " AND p.price <= %s"
        args.append(float(price_max))
    if search:
        query += " AND (p.name ILIKE %s OR p.description ILIKE %s)"
        args.extend([f"%{search}%", f"%{search}%"])

    query += " ORDER BY p.created_at DESC"

    cur.execute(query, args)
    rows = cur.fetchall()
    cols = [d[0] for d in cur.description]

    products = []
    for row in rows:
        p = dict(zip(cols, row))
        p["price"] = float(p["price"])
        p["price_old"] = float(p["price_old"]) if p["price_old"] else None
        products.append(p)

    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"products": products}, ensure_ascii=False),
    }
