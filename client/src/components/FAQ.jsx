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
              <p className="faq-question" id="how">How does Bluecent work?</p>
              <p className="faq-answer">Bluecent rounds up the spare change you make in daily transactions, and at the end of every month donates the sum to Democratic candidates running for Congress in 2018. Connect your bank account to Bluecent after signing up, and the app will immediately begin rounding-up and tallying spare change as you make transactions. Users can also optionally identify particular candidates for US Senate and US House of Representatives that they want to support, and what percentage of their contribution they want going to each candidate.</p>
              <p className="faq-answer">Then, at the beginning of each month, Bluecent totals contributions for each Democratic candidate and makes a donation directly to their campaign.</p>
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
              <p className="faq-answer">Bluecent is created and maintained by <a href="http://rowankrishnan.com" className="faq-link">Rowan Krishnan</a>, a software engineer based in Boston, Massachusetts.</p>
            </li>
            <li className="faq-item">
              <p className="faq-question">How do I contact Bluecent?</p>
              <p className="faq-answer">The best way to get in touch is to send an email to <a href="mailto:rowan@bluecent.org" className="faq-link">rowan@bluecent.org</a>. You can also reach out on <a href="#" className="faq-link">Twitter</a> or <a href="#" className="faq-link">Facebook</a>. If you notice any bugs or inconsistencies on the site, please let us know!</p>
            </li>
            <li className="faq-item">
              <p className="faq-question">Can I help or get involved in any way?</p>
              <p className="faq-answer">We’re always on the lookout for folks to help on the app development side of things. Bluecent is built with Node.js and React, so experience with those technologies is a plus. Check out our <a href="http://github.com/rkrishnan8594/bluecent" className="faq-link">repository</a> on GitHub for more information about how Bluecent is built.</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
