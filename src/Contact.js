import React, { useRef } from "react";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";

function Contact() {
    const form = useRef();
    const recaptchaRef = React.createRef();

    function sendEmail(e) {
        e.preventDefault();

        // recaptcha
        const recaptchaValue = recaptchaRef.current.getValue();
        
        console.log('sending email soon');

        let emailForm = {
            "playground_name" : form.current.playground_name.value,
            "message" : form.current.message.value,
            "user_email" : form.current.user_email.value,
            "g-recaptcha-response" : recaptchaValue
        };
        console.log(emailForm);
        emailjs.send('service_cchoi6484', 'template_5c5n5td', emailForm, 'JpXUUhatC2LSUog0c')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });

        // emailjs.sendForm('service_cchoi6484', 'template_5c5n5td', emailForm, 'JpXUUhatC2LSUog0c')
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });
    }

    function onChange(value) {
        console.log("Captcha value:", value);
    }

    return (
        <div className="p-3">
            <div className="card mb-3">
                <div className="card-body pt-0">
                    <div className="d-flex justify-content-between align-items-center px-2 mb-2">
                        <div>
                            <h3 className="fs-2 mb-0 me-3">Please Let Us Know</h3>
                            {/* <span className="text-muted">at cchoi6484@gmail.com</span><br/>
                            <span className="text-muted">or use the form below</span> */}
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
                    </div>
                    <form ref={form} onSubmit={sendEmail}>
                        <input type="text" className="form-control mb-2" name="playground_name" placeholder="Playground Name" />
                        <textarea className="form-control mb-2" name="message" rows="5" placeholder="Message"></textarea>
                        <input type="text" className="form-control mb-2" name="user_email" placeholder="Your Email Address" />
                        <ReCAPTCHA
                            sitekey="6LfuslgnAAAAAJeTJGY5KhGUcHehfnLPheVv4_bC"
                            ref={recaptchaRef}
                            onChange={onChange}
                        />
                        <button type="submit" className="btn btn-primary w-100">
                            Send
                            <span className="visually-hidden">Send an email</span>
                        </button>
                    </form>
                </div>
            </div>
            <ul className="list-group">
                <li className="list-group-item">Version 1.0</li>
                <li className="list-group-item">Terms of Use</li>
                <li className="list-group-item">Privacy Policy</li>
                <li className="list-group-item">Image Attribution</li>
            </ul>
        </div>
    );
}

export default Contact;