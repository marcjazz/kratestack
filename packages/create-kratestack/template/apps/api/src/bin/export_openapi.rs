use api::ApiDoc;
use utoipa::OpenApi;

fn main() {
    println!("{}", ApiDoc::openapi().to_json().unwrap());
}
