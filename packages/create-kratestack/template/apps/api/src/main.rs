use api::app;
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let app = app();

    // Run it with hyper on localhost:8080
    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    println!("listening on {}", addr);
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
