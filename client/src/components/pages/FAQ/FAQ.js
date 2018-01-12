import React from "react";
import "./FAQ.css";

const FAQ = () => (
  <div className="faq">
    <div className="faq__header">
      <h1 className="faq__header__title">Frequently Asked Questions</h1>
    </div>
    <div className="faq__content">
      <ul className="faq__items">
        <li className="faq__item">
          <p className="faq__item--question" id="how">
            How does Bluecent work?
          </p>
          <p className="faq__item--answer">
            Bluecent rounds up spare change from daily financial transactions
            and at the end of every week donates the sum to Democratic
            candidates running for Congress in 2018. For example, spending $7.20
            on a burrito will add $0.80 to your weekly total. Connect your bank
            account to Bluecent after signing up and the app will immediately
            begin rounding up and tallying spare change as you make
            transactions.
          </p>
          <p className="faq__item--answer">
            Upcoming features will allow users to select specific campaigns that
            they want their contributions to support and the percentage of their
            contribution that will go to each campaign.
          </p>
        </li>
        <li className="faq__item">
          <p className="faq__item--question">
            Is Bluecent a PAC or a nonprofit?
          </p>
          <p className="faq__item--answer">
            Bluecent is a political action committee registered with the FEC,
            under the name “Bluecent PAC”. This means that Bluecent is subject
            to all US federal campaign finance laws that regulate the activity
            of political action committees and the contributions that they make.
          </p>
        </li>
        <li className="faq__item">
          <p className="faq__item--question">Who works on Bluecent?</p>
          <p className="faq__item--answer">
            Bluecent is created and maintained by{" "}
            <a href="http://rowankrishnan.com" className="faq__link">
              Rowan Krishnan
            </a>, a software engineer based in Boston, Massachusetts.
          </p>
        </li>
        <li className="faq__item">
          <p className="faq__item--question">How do I contact Bluecent?</p>
          <p className="faq__item--answer">
            The best way to get in touch is to send an email to{" "}
            <a href="mailto:rowan@bluecent.org" className="faq__link">
              rowan@bluecent.org
            </a>. If you notice any bugs or inconsistencies on the site, please
            let us know!
          </p>
        </li>
        <li className="faq__item">
          <p className="faq__item--question">
            Can I help or get involved in any way?
          </p>
          <p className="faq__item--answer">
            I’m always on the lookout for folks to help work on app development
            or design. Bluecent is built with Node.js and React, so experience
            with those technologies is a plus. Check out our{" "}
            <a
              href="http://github.com/rkrishnan8594/bluecent"
              className="faq__link"
            >
              repository
            </a>{" "}
            on GitHub for more information about how Bluecent is built.
          </p>
        </li>
      </ul>
    </div>
  </div>
);

export default FAQ;
