from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import OrderHistory, OrderItem, db
from datetime import datetime

order_history_routes = Blueprint('order_histories', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@order_history_routes.route('/')
def get_order_history():
    order_histories = OrderHistory.query.all()
    return jsonify({'order_histories': [order_history.to_dict() for order_history in order_histories]})


@order_history_routes.route('/new', methods=["POST"])
@login_required
def create_order_history():
    user_id = request.json['user_id']
    date = request.json['date']

    shopping_bag = request.json['shoppingBag']

    result = []

    new_order_history = OrderHistory(
        # id=id,
        user_id=user_id,
        date=date
    )

    if new_order_history:
        db.session.add(new_order_history)
        db.session.commit()

    for item in shopping_bag:

        new_order_item = OrderItem(
        product_id= int(item['id']),
        product_image_url = item['image_url_1'],
        product_name = item['product_name'],
        product_price = item['price'],
        order_history_id=new_order_history.to_dict()['id'],
        qty=1
        )
        db.session.add(new_order_item)
        db.session.commit()
        result.append(new_order_item)

    return new_order_history.to_dict()
