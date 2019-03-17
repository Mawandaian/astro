from flask import Flask, session, g, request, redirect, url_for, render_template, json, jsonify
from functools import wraps
import datetime
from sqlalchemy import create_engine  
from sqlalchemy import Column, String, Integer, DateTime, JSON  
from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.orm import sessionmaker
import time
import os.path
from flask_mail import Mail, Message


title='Holiday Scapes'

db_string = "postgres://postgres:Kitekuma@localhost:5432/solomon_db"

db = create_engine(db_string)  
base = declarative_base()

class Bookings(base):
    __tablename__ = 'bookings'

    booking_id = Column(Integer, primary_key=True, autoincrement=True)
    package_id = Column(String)
    booker_email = Column(String)
    booker_phone_number = Column(String)
    booker_surname = Column(String)
    booker_firstname = Column(String)
    booker_message = Column(String)
    booking_seen = Column(String)
    booking_replied = Column(String)
    time_stamp = Column(DateTime, default=datetime.datetime.utcnow)

class Destination(base):
    __tablename__ = 'destination'

    destination_id = Column(Integer, primary_key=True, autoincrement=True)
    destination_image = Column(String)
    destination_name = Column(String)
    destination_packages = Column(JSON)
    destination_categories = Column(JSON)
    time_stamp = Column(DateTime, default=datetime.datetime.utcnow)

class Package(base):
    __tablename__ = 'package'

    package_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    duration = Column(String)
    expiry_date = Column(String)
    price = Column(String)
    deposit = Column(String)
    destination_id = Column(String)
    category = Column(JSON)
    details = Column(String)
    photo = Column(JSON)
    itinerary = Column(JSON)
    active = Column(String)
    time_stamp = Column(DateTime, default=datetime.datetime.utcnow)

class Users(base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String)
    password = Column(String)


class Photos(base):
    __tablename__ = 'photos'

    photo_id = Column(Integer, primary_key=True, autoincrement=True)
    photo = Column(String)
    time_stamp = Column(DateTime, default=datetime.datetime.utcnow)


Session = sessionmaker(db)  
db_session = Session()

base.metadata.create_all(db)

# Create 
bookings = Bookings()  
#db_session.add(bookings)  

destination = Destination()
#db_session.add(destination)

package = Package()
#db_session.add(package)

# users = Users(username="mawazvol", password="1234")
users = Users()
#db_session.add(users)

photos = Photos()
#db_session.add(photos)

db_session.commit()

#################################################################################

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))

def create_image_from_datauri(data_uri, image_name):
    from base64 import b64decode
    
    header, encoded = data_uri.split(",", 1)
    data = b64decode(encoded)
    
    with open("{}/static/real_images/{}.jpeg".format(root_dir(), image_name), "wb") as f:
        f.write(data)
    

def create_image_thumbnail(image_path, image_name):
    import glob
    from PIL import Image

    image_file = "{}real_images/{}.jpeg".format(image_path, image_name)
    # get all the jpg files from the current folder
    for infile in glob.glob("{}".format(image_file)):
        im = Image.open(infile)
        # convert to thumbnail image
        im.thumbnail((512, 512), Image.ANTIALIAS)
        # don't save if thumbnail already exists
        if infile[0:2] != "T_":
            # prefix thumbnail file with T_
            im.save("{}thumbnails/T_{}.jpeg".format(image_path, image_name), "JPEG")

def get_all_destinations():
    querys = db_session.query(Destination).all()
    destination_dictionary = {}

    for query in querys:
        destination_dictionary.update({query.destination_id : query.destination_name})
    
    return destination_dictionary


app = Flask(__name__)

# Updating the email config
app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_SUPPRESS_SEND = False,
    TESTING = False,
    MAIL_USERNAME = 'mawazvol@gmail.com',
    MAIL_PASSWORD = 'Kitekuma1',
))

# Creating the mail instance
mail = Mail(app)

# Set the secret key to some random bytes. Keep this really secret!
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/send_email', methods=['GET', 'POST'])
def send_email():
    if request.method == 'POST':
        pack_id = str(request.form['id'])
        pack_name = str(request.form['name'])
        destination = str(request.form['destination'])
        full_name = str(request.form['full_name'])
        email = str(request.form['email'])
        phone_number = str(request.form['phone_number'])
        number_of_nights = str(request.form['number_of_nights'])
        number_of_adults = str(request.form['number_of_adults'])
        number_of_children = str(request.form['number_of_children'])
        select_categories = str(request.form['select_categories'])
        room_type = str(request.form['room_type'])
        departing_on = str(request.form['departing_on'])
        returning_on = str(request.form['returning_on'])

        msg = Message("Booking",
            sender="mawazvol@gmail.com",
            recipients=["mawazvol@yahoo.com"])
        # msg.body = "Assured"
        msg.html = '<html><head></head><body><img src="https://odis.homeaway.com/odis/listing/03af0d91-b8b0-46ee-97be-64462809f6e9.c10.jpg" alt="Here Now"><h1 style="background: black; color: white; ">Title Here</h1><table border="1"><tr><td><b>Image:</b></td><td>' + pack_name + '</td></tr><tr><td><b>Package:</b></td><td>' + pack_name + '</td></tr><tr><td><b>Destination:</b></td><td>' + destination + '</td></tr><tr><td><b>Booker\'s Name:</b></td><td>' + full_name + '</td></tr><tr><td><b>Email:</b></td><td>' + email + '</td></tr><tr><td><b>Phone:</b></td><td>' + phone_number + '</td></tr><tr><td><b>Nights:</b></td><td>' + number_of_nights + '</td></tr><tr><td><b>Adults:</b></td><td>' + number_of_adults + '</td></tr><tr><td><b>Children:</b></td><td>' + number_of_children + '</td></tr><tr><td><b>Category:</b></td><td>' + select_categories + '</td></tr><tr><td><b>Room Type:</b></td><td>' + room_type + '</td></tr><tr><td><b>Date From:</b></td><td>' + departing_on + '</td></tr><tr><td><b>Date To:</b></td><td>' + returning_on + '</td></tr></table></body></html>'

        mail.send(msg)

        return 'Sent'


@app.route('/send_message_email', methods=['GET', 'POST'])
def send_message_email():
    if request.method == 'POST':
        fname = str(request.form['fname'])
        lname = str(request.form['lname'])
        email = str(request.form['email'])
        message = str(request.form['message'])

        msg = Message("Message",
            sender="mawazvol@gmail.com",
            recipients=["mawazvol@yahoo.com"])
        # msg.body = "Assured"
        msg.html = '<html><head></head><body><table border="1"><tr><td><b>First Name:</b></td><td>' + fname + '</td></tr><tr><td><b>Last Name:</b></td><td>' + lname + '</td></tr><tr><td><b>Email:</b></td><td>' + email + '</td></tr><tr><td><b>Message:</b></td><td>' + message + '</td></tr></table></body></html>'

        mail.send(msg)

        return 'Sent'

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        POST_USERNAME = str(request.form['username'])
        POST_PASSWORD = str(request.form['password'])

        query = db_session.query(Users).filter(Users.username.in_([POST_USERNAME]), Users.password.in_([POST_PASSWORD]) )
        result = query.first()
        if result:
            session['logged_in'] = True
            session['user_id'] = result.user_id
            return redirect(url_for('administrator_home'))
        else:
            error = 'Invalid Credentials. Please try again.'
        
    return render_template('administrator_login.html', error=error)

@app.route('/administrator_home')
@login_required
def administrator_home():
    error = None
    return render_template('administrator_home.html', error=error, post_package='post_package', destinations=get_all_destinations())

@app.route('/post_package', methods=['GET', 'POST'])
@login_required
def post_package():
    error = None
    
    if request.method == 'POST':
        package_name = str(request.form['package_name'])
        package_duration = str(request.form['duration'])
        package_price = str(request.form['price'])
        package_destination = str(request.form['destination'])
        package_details = str(request.form['details'])
        package_photo_counter = int(request.form['photo_counter'])

        photo_ids = []

        # for photo in range(0, package_photo_counter):
        #     package_photo_data_uri = request.form['photo_data_uri_1']
        #     photos = Photos(photo=package_photo_data_uri)
        #     db_session.add(photos)
        #     db_session.flush()
        #     db_session.refresh(photos)
        #     photo_ids.append(photos.photo_id)

        package = Package(name=package_name, duration=package_duration, price=package_price, destination_id=package_destination, details=package_details, photo=photo_ids)
        db_session.add(package)

        db_session.commit()
        
    return render_template('administrator_home.html', error=error, post_package='post_package', destinations=get_all_destinations())


@app.route('/receive_destination', methods=['GET', 'POST'])
@login_required
def receive_destination():
    error = None
    
    if request.method == 'POST':
        new_destination_name = str(request.form['new_destination'])
        photo_data_uri = str(request.form['photo_data_uri'])
        
        timestamp = time.time()

        create_image_from_datauri(photo_data_uri, timestamp)
        create_image_thumbnail("{}/static/".format(root_dir()), timestamp)

        category = {}
        category['family'] = [] 
        category['corporate'] = [] 
        category['friends'] = [] 
        category['solo'] = [] 

        family_name_1 = [str(request.form['family_name_1']), str(request.form['family_price_1']), str(request.form['family_rating_1'])]
        family_name_2 = [str(request.form['family_name_2']), str(request.form['family_price_2']), str(request.form['family_rating_2'])]
        family_name_3 = [str(request.form['family_name_3']), str(request.form['family_price_3']), str(request.form['family_rating_3'])]
        family_name_4 = [str(request.form['family_name_4']), str(request.form['family_price_4']), str(request.form['family_rating_4'])]
        family_name_5 = [str(request.form['family_name_5']), str(request.form['family_price_5']), str(request.form['family_rating_5'])]

        category['family'].append({
                        'family_name_1': family_name_1,
                        'family_name_2': family_name_2,
                        'family_name_3': family_name_3,
                        'family_name_4': family_name_4,
                        'family_name_5': family_name_5,
                    })

        corporate_name_1 = [str(request.form['corporate_name_1']), str(request.form['corporate_price_1']), str(request.form['corporate_rating_1'])]
        corporate_name_2 = [str(request.form['corporate_name_2']), str(request.form['corporate_price_2']), str(request.form['corporate_rating_2'])]
        corporate_name_3 = [str(request.form['corporate_name_3']), str(request.form['corporate_price_3']), str(request.form['corporate_rating_3'])]
        corporate_name_4 = [str(request.form['corporate_name_4']), str(request.form['corporate_price_4']), str(request.form['corporate_rating_4'])]
        corporate_name_5 = [str(request.form['corporate_name_5']), str(request.form['corporate_price_5']), str(request.form['corporate_rating_5'])]

        category['corporate'].append({
                        'corporate_name_1': corporate_name_1,
                        'corporate_name_2': corporate_name_2,
                        'corporate_name_3': corporate_name_3,
                        'corporate_name_4': corporate_name_4,
                        'corporate_name_5': corporate_name_5,
                    })

        friends_name_1 = [str(request.form['friends_name_1']), str(request.form['friends_price_1']), str(request.form['friends_rating_1'])]
        friends_name_2 = [str(request.form['friends_name_2']), str(request.form['friends_price_2']), str(request.form['friends_rating_2'])]
        friends_name_3 = [str(request.form['friends_name_3']), str(request.form['friends_price_3']), str(request.form['friends_rating_3'])]
        friends_name_4 = [str(request.form['friends_name_4']), str(request.form['friends_price_4']), str(request.form['friends_rating_4'])]
        friends_name_5 = [str(request.form['friends_name_5']), str(request.form['friends_price_5']), str(request.form['friends_rating_5'])]

        category['friends'].append({
                        'friends_name_1': friends_name_1,
                        'friends_name_2': friends_name_2,
                        'friends_name_3': friends_name_3,
                        'friends_name_4': friends_name_4,
                        'friends_name_5': friends_name_5,
                    })

        solo_name_1 = [str(request.form['solo_name_1']), str(request.form['solo_price_1']), str(request.form['solo_rating_1'])]
        solo_name_2 = [str(request.form['solo_name_2']), str(request.form['solo_price_2']), str(request.form['solo_rating_2'])]
        solo_name_3 = [str(request.form['solo_name_3']), str(request.form['solo_price_3']), str(request.form['solo_rating_3'])]
        solo_name_4 = [str(request.form['solo_name_4']), str(request.form['solo_price_4']), str(request.form['solo_rating_4'])]
        solo_name_5 = [str(request.form['solo_name_5']), str(request.form['solo_price_5']), str(request.form['solo_rating_5'])]

        category['solo'].append({
                        'solo_name_1': solo_name_1,
                        'solo_name_2': solo_name_2,
                        'solo_name_3': solo_name_3,
                        'solo_name_4': solo_name_4,
                        'solo_name_5': solo_name_5,
                    })

        destination = Destination(destination_name=new_destination_name, destination_image=timestamp, destination_categories=category)
        db_session.add(destination)
        db_session.commit()
        
    return render_template('administrator_home.html', error=error, post_package='post_package', destinations=get_all_destinations())

@app.route('/receive_blob', methods=['GET', 'POST'])
def receive_blob():
    if request.method == 'POST':
        package_name = str(request.form['package_name'])
        package_duration = str(request.form['duration'])
        package_price = str(request.form['price'])
        package_destination = str(request.form['destination'])
        package_expiry_date = str(request.form['expiry_date'])
        package_details = str(request.form['details'])
        package_photo_counter = int(request.form['photo_counter'])

        photo_data = {}  
        photo_data['photos'] = [] 

        package_itinerary = {}
        package_itinerary['itinerary'] = [] 
        

        itinerary_package_photo_counter = int(request.form['itinerary_counter'])

        photo = request.form.getlist('photos[]')

        package_category = request.form.getlist('category')

        dict = request.form
        for key in dict:
            range_limit = package_photo_counter + 1
            for x in range(1, range_limit):
                if key == 'photo{}'.format(x):
                    data_uri = dict[key]
                    #Assuming server does not return same timestamp
                    timestamp = time.time()

                    create_image_from_datauri(data_uri, timestamp)
                    create_image_thumbnail("{}/static/".format(root_dir()), timestamp)

                    photo_data['photos'].append({  
                        'photo_name': '{}'.format(timestamp)
                    })

            # Itinerary section
            itinerary_range_limit = itinerary_package_photo_counter + 1
            for x in range(1, itinerary_range_limit):
                if key == 'itinerary_photo{}'.format(x):
                    itinerary_data_uri = dict['itinerary_photo{}'.format(x)]
                    itinerary_title = str(dict['itinerary_title{}'.format(x)])
                    itinerary_details = str(dict['itinerary_details{}'.format(x)])

                    timestamp = time.time()

                    create_image_from_datauri(itinerary_data_uri, timestamp)
                    create_image_thumbnail("{}/static/".format(root_dir()), timestamp)

                    package_itinerary['itinerary'].append({
                        'itinerary_title': itinerary_title,
                        'itinerary_details': itinerary_details,
                        'itinerary_photo' : '{}'.format(timestamp)
                    })

        package = Package(name=package_name, duration=package_duration, expiry_date=package_expiry_date, price=package_price, destination_id=package_destination, category = package_category, details=package_details, photo=photo_data, itinerary=package_itinerary, active="True")
        db_session.add(package)

        db_session.commit()

        return 'blob received'
    print('blob not received')
    return 'blob not received'


@app.route('/get_packages')
def get_packages():
    # package_query = db_session.query(Package).order_by(Package.name).all();
    package_query = db_session.query(Package).order_by(Package.package_id).all();
    packages_array = [];
    for package in package_query:
        x = {
            "package_id": package.package_id,
            "name": package.name,
            "duration": package.duration,
            "expiry_date": package.expiry_date,
            "price": package.price,
            "deposit": package.deposit,
            "destination_id": package.destination_id,
            "category": package.category,
            "details": package.details,
            "photo": package.photo,
            "itinerary": package.itinerary,
            "active": package.active,
            "time_stamp": package.time_stamp
            }
        packages_array.append(x)
    
    print(packages_array)

    return jsonify(packages_array);


@app.route('/get_destinations')
def get_destinations():
    # package_query = db_session.query(Package).order_by(Package.name).all();
    destination_query = db_session.query(Destination).order_by(Destination.destination_id).all();
    destination_array = [];
    for destination in destination_query:
        x = {
            "destination_id": destination.destination_id,
            "destination_image": destination.destination_image,
            "destination_name": destination.destination_name,
            "destination_categories": destination.destination_categories,
            "time_stamp": destination.time_stamp
            }
        destination_array.append(x)

    return jsonify(destination_array);

@app.route('/')
def home():
    error = None
    return render_template('home.html', error=error, post_package='post_package', destinations=get_all_destinations())

@app.route('/prototype')
def prototype():
    error = None
    return render_template('prototype.html', error=error, post_package='post_package', destinations=get_all_destinations(), title=title)

@app.route('/modal')
def modal():
    error = None
    return render_template('modal.html', error=error, post_package='post_package', destinations=get_all_destinations())


@app.route('/pop')
def popit():
    session.pop('user_id', None)
    return 'Session popped';

if __name__=='__main__':
    app.debug = True
    app.run(host='0.0.0.0')