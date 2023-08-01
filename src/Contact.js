import React, { useRef } from "react";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function Contact() {
    const form = useRef();
    const recaptchaRef = React.createRef();

    function sendEmail(e) {
        e.preventDefault();

        // validation
        if (!form.current.checkValidity()) {
            e.stopPropagation();
            form.current.className = "was-validated";
            return;
        }

        // recaptcha
        const recaptchaValue = recaptchaRef.current.getValue();
        
        let emailForm = {
            "playground_name" : form.current.playground_name.value,
            "message" : form.current.message.value,
            "user_email" : form.current.user_email.value,
            "g-recaptcha-response" : recaptchaValue
        };
        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, emailForm, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
            .then(function(response) {
                form.current.className = "needs-validated";
                // console.log('SUCCESS!', response.status, response.text);
                toast.success("Your message has been sent!", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }, function(error) {
                form.current.className = "needs-validated";
                // console.log('FAILED...', error);
                toast.error("Oops, something goes wrong.", {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
            });
    }

    function recaptchaChanges(value) {
        form.current.send_button.disabled = false;
    }

    return (
        <div className="p-3">
            <div className="card mb-3">
                <div className="card-body pt-0">
                    <div className="d-flex justify-content-between align-items-center px-2 mb-2">
                        <div>
                            <h3 className="fs-2 mb-0 me-3 text-pri">Please Let Us Know</h3>
                        </div>
                        <img className="w-50" src="/images/email.jpg" alt="Email Us"></img>
                    </div>
                    <div className="col-12">
                        <p className="ms-2">if you have something in your mind ... </p>
                        <ol>
                            <li>to report incorrect information</li>
                            <li>to contribute photos or facility info</li>
                            <li>to request to add a playground</li>
                        </ol>
                        <p className="bg-basic p-2 border-radius-8 text-center">
                            Email directly at <span className="text-secondary">support@swingandslide.net</span><br/>
                            or use the form below
                        </p>
                    </div>
                    <form ref={form} onSubmit={sendEmail} className="needs-validation" noValidate>
                        <input type="text" className="form-control mb-2" name="playground_name" placeholder="Playground Name" autoComplete="off" required />
                        <textarea className="form-control mb-2" name="message" rows="5" placeholder="Message" autoComplete="off" required ></textarea>
                        <input type="text" className="form-control mb-2" name="user_email" placeholder="Your Email Address" required />
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                            ref={recaptchaRef}
                            onChange={recaptchaChanges}
                            className="d-flex"
                        />
                        <button type="submit" name="send_button" className="btn btn-primary w-100" disabled>
                            Send
                            <span className="visually-hidden">Send an email</span>
                        </button>
                    </form>
                </div>
            </div>
            <ul className="list-group">
                <li className="list-group-item">Version 1.0</li>
                <li className="list-group-item"><Link to="/terms" className="text-decoration-none text-black cursor-pointer">Terms of Use</Link></li>
                <li className="list-group-item"><Link to="/privacy" className="text-decoration-none text-black cursor-pointer">Privacy Policy</Link></li>
                <li className="list-group-item"><Link to="/images" className="text-decoration-none text-black cursor-pointer">Image Attribution</Link></li>
            </ul>
            <ToastContainer />
        </div>
    );
}

export default Contact;