import flask
import flask_mail
from flask_sqlalchemy import SQLAlchemy
import flask_migrate
from flask_login import LoginManager
# import app.utils
from app.config import Config


flask_app = flask.Flask(__name__)
flask_app.config.from_object(Config)

mail = flask_mail.Mail(flask_app)

# configuring the database
db = SQLAlchemy(flask_app)
migrate = flask_migrate.Migrate(flask_app, db)

# # Flask Login
# login_manager = LoginManager()
# login_manager.login_view = 'accounts_bp.login'
# login_manager.init_app(flask_app)




# connection blueprints
from app.accounts_bp import accounts_bp
from app.main_bp import main_bp

from app import routes
flask_app.register_blueprint(accounts_bp, url_prefix="/accounts")
flask_app.register_blueprint(main_bp)

with flask_app.app_context():
	# db.drop_all()
	db.create_all()
