API Rules

Prefix

Semua endpoint menggunakan:
/api/v1/...

{
"success": true,
"message": "Success",
"data": {}
}

{
"success": false,
"message": "Error message",
"errors": {}
}

Error responses:

400 Bad Request — invalid input
401 Unauthorized — missing/invalid token
403 Forbidden — no permission
404 Not Found — resource doesn’t exist
409 Conflict — constraint violation
500 Internal Server Error — server issue

Semua error harus throw dari service, bukan dari controller.

Pagination wajib:

{
  "total": 100,
  "page": 1,
  "limit": 10,
  "data": []
}

Status Code

* 200 OK
* 201 Created
* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 422 Validation Error
* 500 Internal Server Error

Rules

* Endpoint private wajib JWT.
* Admin endpoint wajib role guard.
* Pagination wajib untuk list data.
* Filter dan search harus tervalidasi.
    EOF

