"""Получение списка категорий товаров"""
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

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute("SELECT id, name, slug, description FROM categories ORDER BY id")
    rows = cur.fetchall()
    cols = [d[0] for d in cur.description]
    categories = [dict(zip(cols, row)) for row in rows]
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"categories": categories}, ensure_ascii=False),
    }
