use api::app;
use vercel_runtime::{run_service, ServiceBuilder, tower_anyhow::error_handler, Error};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let app = app();
    let service = ServiceBuilder::new()
        .map_err(error_handler)
        .service(app);
    run_service(service).await
}
