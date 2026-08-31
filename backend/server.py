"""Thin ASGI proxy: the supervisor config (read-only) requires uvicorn on port 8001,
so this forwards every request to the Node.js backend (server.js) on port 8002."""
import os
import httpx
from fastapi import FastAPI, Request
from fastapi.responses import Response

NODE_PORT = os.environ.get("NODE_PORT", "8002")
client = httpx.AsyncClient(base_url=f"http://127.0.0.1:{NODE_PORT}", timeout=60.0)

app = FastAPI()

HOP_HEADERS = {"host", "content-length", "connection", "transfer-encoding"}


@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"])
async def proxy(path: str, request: Request):
    body = await request.body()
    headers = {k: v for k, v in request.headers.items() if k.lower() not in HOP_HEADERS}
    resp = await client.request(
        request.method,
        f"/{path}",
        content=body,
        headers=headers,
        params=dict(request.query_params),
    )
    out_headers = {k: v for k, v in resp.headers.items() if k.lower() not in HOP_HEADERS}
    return Response(content=resp.content, status_code=resp.status_code, headers=out_headers)


@app.on_event("shutdown")
async def shutdown():
    await client.aclose()
