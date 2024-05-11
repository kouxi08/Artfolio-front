package main

import (
	"fmt"
	"net/http"

	"os"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	
)

func main() {
	e := echo.New()
	e.Use(middleware.CORS())

	e.POST("/", hello) // ローカル環境の場合、http://localhost:1323/ にGETアクセスされるとhelloハンドラーを実行する

	e.Logger.Fatal(e.Start(":80"))
}

func hello(c echo.Context) error {
	fmt.Println(c.FormValue("name"))
	return c.JSON(http.StatusOK, map[string]interface{}{"bkname": os.Getenv("BUCKET_NAME")})
}