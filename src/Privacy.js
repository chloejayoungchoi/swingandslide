import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Privacy(p) {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <div className="terms p-3">
            <BiArrowBack className="fs-2 text-muted back-arrow" onClick={goBack} />
            <h4 className="text-center">Swing & Slide</h4>
            <h5 className="text-center">Personal Information Protection Policy</h5>
            <hr/>
            <p>
                At Swing & Slide, we are committed to providing our members with exceptional service.  As providing this service involves the collection, use and disclosure of some personal information about our member, protecting their personal information is one of our highest priorities.
            </p>
            <p>
                While we have always respected our members privacy and safeguarded their personal information, we have strengthened our commitment to protecting personal information as a result of British Columbia’s Personal Information Protection Act (PIPA).  PIPA, which came into effect on January 1, 2004, sets out the ground rules for how B.C. businesses and not-for-profit organizations may collect, use and disclose personal information.
            </p>
            <p>
                We will inform our members and visitors of why and how we collect, use and disclose their personal information, obtain their consent where required, and only handle their personal information in a manner that a reasonable person would consider appropriate in the circumstances.
            </p>
            <p>
                This Personal Information Protection Policy, in compliance with PIPA, outlines the principles and practices we will follow in protecting members’ personal information.  Our privacy commitment includes ensuring the accuracy, confidentiality, and security of our members’ personal information and allowing our members to request access to, and correction of, their personal information.
            </p>
            <h6>Definitions</h6>
            <p>
                <b>Personal Information</b> – means information about an identifiable individual. Personal information does not include contact information (described below).
            </p>
            <p>
                <b>Contact information</b> – means information that would enable an individual to be contacted at a place of business and includes name, position name or title, business telephone number, business address, business email or business fax number.  Contact information is not covered by this policy or PIPA.
            </p>
            <p>
                <b>Privacy Officer</b> – means the individual designated responsibility for ensuring that Swing & Slide complies with this policy and PIPA. 
            </p>
            <h6>Policy 1 – Collecting Personal Information</h6>
            <p>
                1.1  Unless the purposes for collecting personal information are obvious and the member voluntarily provides his or her personal information for those purposes, we will communicate the purposes for which personal information is being collected, either orally or in writing, before or at the time of collection. 
            </p>
            <p>
                1.2  We will only collect member information that is necessary to fulfill the following purposes: 
                <ul>
                <li>To verify identity</li>
                <li>To personalized members’ experience</li>
                <li>To provide our members with improved service</li> 
                <li>To send out emails to respond members’ inquiries or request.</li>
                </ul>
            </p>
            <h6>Policy 2 – Consent</h6>
            <p>
                2.1  We will obtain member consent to collect, use or disclose personal information (except where, as noted below, we are authorized to do so without consent). 
            </p>
            <p>
                2.2  Consent can be provided electronically or it can be implied where the purpose for collecting using or disclosing the personal information would be considered obvious and the member voluntarily provides personal information for that purpose. 
            </p>
            <p>
                2.3  Consent may also be implied where a member is given notice and a reasonable opportunity to opt-out of his or her personal information being used for our service and the member does not opt-out. 
            </p>
            <p>
                2.4  Subject to certain exceptions (e.g., the personal information is necessary to provide the service or product, or the withdrawal of consent would frustrate the performance of a legal obligation), members can withhold or withdraw their consent for Swing & Slide to use their personal information in certain ways.  A member’s decision to withhold or withdraw their consent to certain uses of personal information may restrict our ability to provide a particular service or product.  If so, we will explain the situation to assist the member in making the decision. 
            </p>
            <p>
                2.5  We may collect, use or disclose personal information without the member’s knowledge or consent in the following limited circumstances: 
                <ul>
                <li>When the collection, use or disclosure of personal information is permitted or required by law;</li>
                <li>In an emergency that threatens an individual's life, health, or personal security;</li>
                <li>When the personal information is available from a public source (e.g., a telephone directory);</li>
                <li>When we require legal advice from a lawyer;</li>
                <li>For the purposes of collecting a debt;</li>
                <li>To protect ourselves from fraud;</li>
                <li>To investigate an anticipated breach of an agreement or a contravention of law </li>
                </ul>
            </p>
            <h6>Policy 3 – Using and Disclosing Personal Information</h6>
            <p>
                3.1  We will only use or disclose member personal information where necessary to fulfill the purposes identified at the time of collection 
            </p>
            <p>
                3.2  We will not use or disclose member personal information for any additional purpose unless we obtain consent to do so. 
            </p>
            <p>
                3.3  We will not sell member lists or personal information to other parties. 
            </p>
            <h6>Policy 4 – Retaining Personal Information</h6>
            <p>
                4.1  If we use member personal information to make a decision that directly affects the member, we will retain that personal information for at least one year so that the member has a reasonable opportunity to request access to it. 
            </p>
            <p>
                4.2  Subject to policy 4.1, we will retain member personal information only as long as necessary to fulfill the identified purposes or a legal or business purpose. 
            </p>
            <h6>Policy 5 – Ensuring Accuracy of Personal Information</h6>
            <p>
                5.1  We will make reasonable efforts to ensure that member personal information is accurate and complete where it may be used to make a decision about the member or disclosed to another organization. 
            </p>
            <p>
                5.2  Members may request correction to their personal information in order to ensure its accuracy and completeness.  A request to correct personal information must be made in writing and provide sufficient detail to identify the personal information and the correction being sought. 
            </p>
            <p>
                5.3  If the personal information is demonstrated to be inaccurate or incomplete, we will correct the information as required and send the corrected information to any organization to which we disclosed the personal information in the previous year.  If the correction is not made, we will note the members’ correction request in the file. 
            </p>
            <h6>Policy 6 – Securing Personal Information</h6>
            <p>
                6.1  We are committed to ensuring the security of member personal information in order to protect it from unauthorized access, collection, use, disclosure, copying, modification or disposal or similar risks. 
            </p>
            <p>
                6.2  The following security measures will be followed to ensure that member personal information is appropriately protected: 
                <ul>
                    <li>Store the data in a secure storage</li>
                    <li>the use of user IDs, passwords, encryption, firewalls</li>
                    <li>restricting employee access to personal information as appropriate</li>
                </ul>
            </p>
            <p>
                6.3  We will use appropriate security measures when destroying member’s personal information by deleting electronically stored information. 
            </p>
            <p>
                6.4  We will continually review and update our security policies and controls as technology changes to ensure ongoing personal information security. 
            </p>
            <h6>Policy 7 – Providing Members Access to Personal Information</h6>
            <p>
                7.1  Members have a right to access their personal information, subject to limited exceptions. 
            </p>
            <p>
                7.2  A request to access personal information must be made in writing and provide sufficient detail to identify the personal information being sought.  
            </p>
            <p>
                7.3  Upon request, we will also tell members how we use their personal information and to whom it has been disclosed if applicable. 
            </p>
            <p>
                7.4  We will make the requested information available within 30 business days, or provide written notice of an extension where additional time is required to fulfill the request. 
            </p>
            <p>
                7.5  A minimal fee may be charged for providing access to personal information.  Where a fee may apply, we will inform member of the cost and request further direction from the member on whether or not we should proceed with the request. 
            </p>
            <p>
                7.6  If a request is refused in full or in part, we will notify the member in writing, providing the reasons for refusal and the recourse available to the member. 
            </p>
            <h6>Policy 8 – Questions and Complaints:  The Role of the Privacy Officer or designated individual</h6>
            <p>
                8.1  The Privacy Officer is responsible for ensuring Swing & Slide’s compliance with this policy and the Personal Information Protection Act. 
            </p>
            <p>
                8.2  Members should direct any complaints, concerns or questions regarding Swing & Slide’s compliance in writing to the Privacy Officer. If the Privacy Officer is unable to resolve the concern, the member may also write to the Information and Privacy Commissioner of British Columbia. 
            </p>
            <hr/>
            <p>
                Contact information for Swing & Slide’s Privacy Officer:
            </p>
            <p>
                Chloe Choi<br/>
                privacy@swingandslide.net
            </p>
        </div>
    );
}

export default Privacy;