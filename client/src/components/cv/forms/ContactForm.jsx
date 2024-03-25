import React,{useState} from "react";
import './ContactForm.css';


function ContactForm({ id, toggleForm, contactData, getContactsData }){

    const[contacts, setContacts] = useState({
        title: contactData[0].title,
        phone: contactData[0].phone,
        email: contactData[0].email,
        user_address: contactData[0].user_address,
        facebook: contactData[0].facebook,
        linkedin: contactData[0].linkedin,
        github: contactData[0].github 
    });

    function handleChange(event){
        const{name, value} = event.target;
        setContacts(prevValue => {
            return{
                ...prevValue,
                [name] : value
            }
        });
    }

    async function submitForm(event){
        event.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/contact/${id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: contacts.title,
                    phone: contacts.phone,
                    email: contacts.email,
                    user_address: contacts.user_address,
                    facebook: contacts.facebook,
                    linkedin: contacts.linkedin,
                    github: contacts.github
                })
            });
            getContactsData(id);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div className="contactInfo-form-div">
            <form className="contactInfo-form">
                <h3 className="title"><input onChange={handleChange} type="text" name="title" value={contacts.title}></input><span onClick={toggleForm} className="cancel">x</span></h3>
                    <ul>
                        <li>
                            <span className="icon"><i className="fa fa-phone" aria-hidden="true"></i></span>
                            <input onChange={handleChange} name="phone" type="text" value={contacts.phone}></input>   
                        </li>
                        <li>
                            <span className="icon"><i className="fa fa-envelope-o" aria-hidden="true"></i></span>
                            <input onChange={handleChange} name="email" type="text" value={contacts.email}></input>  
                        </li>
                        <li>
                            <span className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                            <input onChange={handleChange} name="user_address" type="text" value={contacts.user_address}></input>   
                        </li>
                        <li>
                            <span className="icon"><i className="fa fa-facebook-square" aria-hidden="true"></i></span>
                            <input onChange={handleChange} name="facebook" type="text" value={contacts.facebook}></input>   
                        </li>
                        <li>
                            <span className="icon"><i className="fa fa-linkedin-square" aria-hidden="true"></i></span>
                            <input onChange={handleChange} name="linkedin" type="text" value={contacts.linkedin}></input>     
                        </li>
                        <li>
                            <span className="icon"><i className="fa fa-github" aria-hidden="true"></i></span>
                            <input onChange={handleChange} name="github" type="text" value={contacts.github}></input> 
                            <span className="contactInfo-save-form"><i className="fa fa-check-circle-o fa-lg" aria-hidden="true" onClick={submitForm}></i></span>    
                        </li>
                    </ul>
            </form>
        </div> 
    )
}

export default ContactForm;

