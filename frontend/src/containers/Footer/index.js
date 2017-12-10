import React, { Component } from 'react';

import '../..//App.css';

class App extends Component {
  render() {
    return (
        <div  id="footerSection" style={{ clear: "both" }}>
        <div className="container">
          <div className="row">
            <div className="span3">
              <h5>ACCOUNT</h5>
              <a href="login.html">YOUR ACCOUNT</a>
              <a href="login.html">PERSONAL INFORMATION</a> 
              <a href="login.html">ADDRESSES</a> 
              <a href="login.html">DISCOUNT</a>  
              <a href="login.html">ORDER HISTORY</a>
             </div>
            <div className="span3">
              <h5>INFORMATION</h5>
              <a href="contact.html">CONTACT</a>  
              <a href="register.html">REGISTRATION</a>  
              <a href="legal_notice.html">LEGAL NOTICE</a>  
              <a href="tac.html">TERMS AND CONDITIONS</a> 
              <a href="faq.html">FAQ</a>
             </div>
            <div className="span3">
              <h5>OUR OFFERS</h5>
              <a href="">NEW PRODUCTS</a> 
              <a href="">TOP SELLERS</a>  
              <a href="special_offer.html">SPECIAL OFFERS</a>  
              <a href="">MANUFACTURERS</a> 
              <a href="">SUPPLIERS</a> 
             </div>
            <div id="socialMedia" className="span3 pull-right">
              <h5>SOCIAL MEDIA </h5>
              <a href=""><img width="60" height="60" src={window.location.origin + "/themes/images/facebook.png"} title="facebook" alt="facebook"/></a>
              <a href=""><img width="60" height="60" src={window.location.origin + "/themes/images/twitter.png"} title="twitter" alt="twitter"/></a>
              <a href=""><img width="60" height="60" src={window.location.origin + "/themes/images/youtube.png"} title="youtube" alt="youtube"/></a>
             </div> 
           </div>
          <p className="pull-right">&copy; Bootshop</p>
        </div>
        </div>
    );
  }
}

export default App;
