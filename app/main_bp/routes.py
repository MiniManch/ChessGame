import flask
from app.main_bp import main_bp
from flask_login import current_user, login_required
from app import db
import app.main_bp.models as models
from app.main_bp.forms import New_Guide
# from app.utils import get_image, upload_image


@main_bp.route("/")
def index():
	white_pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
	white_pawns = ['pawn'] * 8
	black_pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
	black_pawns = ['pawn'] * 8

	return flask.render_template('index.html', white_pieces=white_pieces, white_pawns=white_pawns, black_pieces=black_pieces,
	                       black_pawns=black_pawns)






