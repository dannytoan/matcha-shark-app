from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Product, db
from datetime import datetime
from app.forms import ProductForm
from app.aws_helper import (
    upload_file_to_s3, allowed_file, get_unique_filename)

product_routes = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@product_routes.route('/')
def products():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

@product_routes.route('/new', methods=["POST"])
def new_product():

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    # if "url" not in upload:
    #     # if the dictionary doesn't have a url key
    #     # it means that there was an error when we tried to upload
    #     # so we send back that error message
    #     return upload, 400

    url = upload["url"]


    form = ProductForm()

    data = form.data


    form['csrf_token'].data = request.cookies['csrf_token']
    # print("_________form___", form['csrf_token'].data)
    if form.validate_on_submit():
        # data = form.data
        new_product = Product(
            user_id=data['user_id'],
            inventory=data['inventory'],
            product_name=data['product_name'],
            price=data['price'],
            description=data['description'],
            category_id=data['category_id'],
            image_url_1=url,
            # image_url_2=data['image_url_2'],
            # image_url_3=data['image_url_3'],
            # image_url_4=data['image_url_4'],
            # image_url_5=data['image_url_5'],
            # image_url_6=data['image_url_6'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@product_routes.route('/<int:id>',)
def product_details(id):
    product = Product.query.get(id)
    return product.to_dict()


@product_routes.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()

    return "Product was successfully deleted."
