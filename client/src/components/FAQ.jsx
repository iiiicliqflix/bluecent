import React, { Component } from 'react';

export default class FAQ extends Component {
  render() {
    return (
      <div className="faq-container">
        <div className="faq-hdr">
          <h1 className="faq-title">Frequently Asked Questions</h1>
        </div>
        <div className="faq-content">
          <ul className="faq-items">
            <li className="faq-item">
              <p className="faq-question">How does Bluecent work?</p>
              <p className="faq-answer">Bluecent rounds up the spare change you make in daily transactions, and at the end of every month donates the sum to Democratic candidates running for Congress in 2018. Connect your bank account to Bluecent after signing up, and the app will immediately begin rounding-up and tallying spare change as you make transactions. Users can also identify particular candidates for US Senate and US House of Representatives that they want to support.</p>
            </li>
            <li className="faq-item">
              <p className="faq-question">What percentage of my contributions go to political campaigns?</p>
              <p className="faq-answer">One-hundred percent. Users may include small donation to Bluecent with each monthly contribution (which goes towards paying the technical costs of maintaining the app), but the amount of spare change raised by users goes entirely to political campaigns.</p>
            </li>
            <li className="faq-item">
              <p className="faq-question">Is Bluecent a PAC or nonprofit?</p>
              <p className="faq-answer">Bluecent is a traditional PAC registered with the FEC, under the name “Bluecent PAC”. This means that Bluecent is subject to all US federal campaign finance laws that regulate the activity of political committees and the contributions that they make.</p>
            </li>
            <li className="faq-item">
              <p className="faq-question">Who is behind Bluecent?</p>
              <p className="faq-answer">Bluecent is created and maintained by Rowan Krishnan.</p>
            </li>
            <li className="faq-item">
              <p className="faq-question">How do I contact Bluecent?</p>
              <p className="faq-answer">The best way to get in touch is to send an email to rowan@bluecent.org. You can also reach out on Twitter or Facebook. If you notice any bugs or inconsistencies on the site, please let us know!</p>
            </li>
            <li className="faq-item">
              <p className="faq-question">Can I help or get involved in any way?</p>
              <p className="faq-answer">We’re always on the lookout for folks to help on the app development side of things. Bluecent is built with Node.js and React, so experience with those technologies is a plus. Check out our repository on GitHub for more information about how Bluecent is built.</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
