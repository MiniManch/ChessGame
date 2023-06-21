import flask
from app.accounts_bp import accounts_bp, models
from app import db, mail,flask_app
import flask_mail
import os
import jwt
from .forms import ResetPasswordRequestForm, ResetPasswordForm
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
# from app.utils import get_image, upload_image


def send_email(subject, sender, recipients, html_body):
    msg = flask_mail.Message(subject, sender=sender, recipients=recipients)
    msg.html = html_body
    mail.send(msg)


def send_password_reset_email(user):
    token = user.get_reset_password_token(flask_app)
    send_email('Password reset',
               sender=os.environ['MAIL_APP_USERNAME'],
               recipients=[user.email],
               html_body=flask.render_template('email/reset_password.html', user=user, token=token))


@accounts_bp.route('/')
def accounts_index():
	return 'Hi from accounts'


@accounts_bp.route('/logout')
@login_required
def logout():
	logout_user()
	return flask.redirect(flask.url_for('main_bp.index'))


@accounts_bp.route('change_password/<int:user_id>', methods=['GET', 'POST'])
def change_password(user_id):
	user=models.User.query.filter_by(id=user_id).first()
	if user is None:
		flask.flash('An error has occurred')
		return flask.redirect(flask.url_for('main_bp.index'))

	form = ResetPasswordForm()
	if form.validate_on_submit():
		user.password = generate_password_hash(form.password.data, method='sha256')
		db.session.commit()
		flask.flash('Details were changed successfully')
		return flask.redirect(flask.url_for('accounts_bp.login'))

	return flask.render_template('change_password.html',form=form,title='Change Passowrd', style='accounts/new.css')


@accounts_bp.route('/reset_password_request', methods=['GET', 'POST'])
def reset_password_request():

    if current_user.is_authenticated:
        return flask.redirect(flask.url_for('main_bp.index'))

    form = ResetPasswordRequestForm()

    if form.validate_on_submit():
        user = models.User.query.filter_by(email=form.email.data).first()

        if user:
            send_password_reset_email(user)

        flask.flash('An email has been sent')
        return flask.redirect(flask.url_for('accounts_bp.login'))
    return flask.render_template('reset_password_request.html', style='accounts/new.css', title='Reset Password', form=form)




