import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Join.css";
import googleLogo from "@/assets/google.png";

const countryList = [
  { name: "India", code: "+91" },
  { name: "Canada", code: "+1" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" }
];

const Join: React.FC = () => {
  const [step, setStep] = useState(1);

  // Tab (Email / Mobile)
  const [activeTab, setActiveTab] = useState<"email" | "mobile">("email");

  // Step 1 fields
  const [fullName, setFullName] = useState("");

  // Email
  const [email, setEmail] = useState("");

  // Mobile
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Password
  const [password, setPassword] = useState("");

  // Error
  const [error, setError] = useState("");

  // Step 3 fields
  const [verificationCode, setVerificationCode] = useState("");
  const [isAgent, setIsAgent] = useState(false);
  const [province, setProvince] = useState("");
  const [board, setBoard] = useState("");
  const [broker, setBroker] = useState("");

  // ==========================================
  //           VALIDATE STEP 1
  // ==========================================
  const validateStep1 = () => {
    if (!fullName.trim()) {
      setError("Full Name is required.");
      return false;
    }

    if (activeTab === "email") {
      if (!email.trim()) {
        setError("Please enter your email.");
        return false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError("Please enter a valid email address.");
        return false;
      }
    }

    if (activeTab === "mobile") {
      if (!phoneNumber.trim()) {
        setError("Please enter your phone number.");
        return false;
      }

      if (phoneNumber.length < 6) {
        setError("Enter a valid phone number.");
        return false;
      }
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <>
      <Navbar />

      <div className="join-container">
        <h2 className="join-title">Create Account</h2>

        {/* ===== STEP INDICATOR ===== */}
        <div className="step-indicator">
          <div className={step >= 1 ? "circle active" : "circle"}>1</div>
          <div className="line"></div>
          <div className={step >= 2 ? "circle active" : "circle"}>2</div>
          <div className="line"></div>
          <div className={step >= 3 ? "circle active" : "circle"}>3</div>
        </div>

        {/* ==================== STEP 1 ==================== */}
        {step === 1 && (
          <div className="step-box">

            {/* Tabs */}
            <div className="tabs">
              <button
                className={activeTab === "email" ? "tab active" : "tab"}
                onClick={() => {
                  setActiveTab("email");
                  setError("");
                }}
              >
                Email
              </button>

              <button
                className={activeTab === "mobile" ? "tab active" : "tab"}
                onClick={() => {
                  setActiveTab("mobile");
                  setError("");
                }}
              >
                Mobile Phone
              </button>
            </div>

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="join-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {/* EMAIL MODE */}
            {activeTab === "email" && (
              <input
                type="email"
                placeholder="Enter your email"
                className="join-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}

            {/* MOBILE MODE */}
            {activeTab === "mobile" && (
              <div className="mobile-outer-box">

                {/* Country dropdown trigger */}
                <div
                  className="country-box"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {selectedCountry.code}
                  <span className="arrow">▼</span>
                </div>

                {/* Dropdown list */}
                {showDropdown && (
                  <div className="country-dropdown-list">
                    {countryList.map((c) => (
                      <div
                        key={c.name}
                        className="country-item"
                        onClick={() => {
                          setSelectedCountry(c);
                          setShowDropdown(false);
                        }}
                      >
                        {c.name} 
                      </div>
                    ))}
                  </div>
                )}

                {/* Number box */}
                <input
                  type="text"
                  className="phone-input-join"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            )}

            {/* Password */}
            <input
              type="password"
              placeholder="Enter password"
              className="join-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="password-rules">
              Passwords must consist of at least 6 characters.<br />
              Passwords must consist 2 of Alphabet, Number digit, Special character.
            </p>

            {/* Error */}
            {error && <p className="error-text">{error}</p>}

            {/* Next Button */}
            <button
              className="next-btn"
              onClick={() => {
                if (validateStep1()) {
                  setStep(2);
                }
              }}
            >
              Next
            </button>

            <div className="or">or</div>

            <button className="google-btn">
  <img
    src={googleLogo}
    alt="google"
    className="google-icon"
  />
  Sign in with Google
</button>
          </div>
        )}

        {/* ==================== STEP 2 ==================== */}
        {step === 2 && (
          <div className="step-box">

            <div className="scroll-card">
              <center><h3>HouseSigma Terms of Use</h3></center>
            <p>
              By using this website, you are agreeing to comply and be bound by the following terms of service and use.
              Please review the following terms in their entirety and ensure their comprehension before using and
              viewing this website.
              <br /><br />

              Acknowledge and understand that the Terms of Use do not create an agency relationship and do not impose
              a financial obligation on the Registrant or create any representation agreement between the Registrant
              and the Participant.
              <br /><br />

              Acknowledges that you are entering into a lawful broker-consumer relationship with the HouseSigma Inc.
              Brokerage.
              <br /><br />

              Acknowledges that after the Terms of Use agreement is opened for viewing, a “mouse click” is sufficient
              to acknowledge agreement to those terms.
              <br /><br />

              Understand that HouseSigma assumes no responsibility for the accuracy of any information shown on the
              HouseSigma website and mobile app.
              <br /><br />

              Understand that all data obtained from the VOW (Virtual Office Website) is intended only for your
              personal, non-commercial use.
              <br /><br />

              Do have a bona fide interest in the purchase, sale, or lease of real estate of the type being offered
              through the VOW.
              <br /><br />

              Agree not to copy, redistribute, retransmit, or otherwise use any of the data or Listing Information
              provided, except in connection with the Consumer’s consideration of the purchase, sale, or lease of an
              individual property.
              <br /><br />

              Acknowledge the Board/Association ownership of and the validity of the copyright in the MLS® database.
              <br /><br />

              If at any time, an agreement is entered between HouseSigma Inc. and Consumer imposing a financial
              obligation on the Consumer or creating representation of the Consumer by HouseSigma Inc., it must be
              established separately from the Terms of Use and may not be accepted solely by mouse click.
              <br /><br />

              <strong>Copyright</strong><br />
              The content on this website is protected by copyright laws and is intended solely for private,
              non-commercial use. Any reproduction, distribution, or use beyond personal purposes is prohibited.
              </p>
            </div>

            <div className="scroll-card">
              <center><h3>Canadian Real Estate Association Terms of Use</h3></center>
              <p>
                You are agreeing to comply and be bound by the following terms of service and use.
                <br /><br />

                The information provided on this site is based in whole or in part on information provided by members of
                The Canadian Real Estate Association, who are responsible for its accuracy. CREA assumes no responsibility
                for its accuracy.
                <br /><br />

                CREA owns the REALTOR® and MLS® trademarks. These marks identify real estate professionals who are
                members of CREA and who must follow CREA's rules, By-Laws, and REALTOR® Code.
                <br /><br />

                The information may only be used by consumers with a bona fide interest in real estate transactions and
                cannot be used for commercial purposes.
                <br /><br />

                RAHB and OREB make no representations regarding the accuracy or suitability of the listing information.
              </p>
            
            </div>

            <div className="step2-actions">
              <button className="reject-btn" onClick={() => setStep(1)}>
                Reject
              </button>

              <button className="agree-btn" onClick={() => setStep(3)}>
                Agree
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 3 ==================== */}
        {step === 3 && (
          <div className="step-box-small">
            <p className="verification-text">
              We sent you a code to verify your account<br />
              <span className="verification-email">
                {activeTab === "email"
                  ? email
                  : selectedCountry.code + phoneNumber}
              </span>
            </p>

            <input
              type="text"
              placeholder="Verification Code"
              className="join-input"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />

            <button className="next-btn">Confirm</button>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isAgent}
                onChange={() => setIsAgent(!isAgent)}
              />
              I am a licensed real estate agent.
            </label>

            {isAgent && (
              <div className="agent-section">
                <label>Province</label>
                <select
                  className="join-input"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="AB">AB – Alberta</option>
                  <option value="QC">QC – Quebec</option>
                  <option value="SK">SK – Saskatchewan</option>
                  <option value="NS">NS – Nova Scotia</option>
                  <option value="MB">MB – Manitoba</option>
                  <option value="Other">Other</option>
                </select>

                <label>Board name</label>
                <input
                  type="text"
                  className="join-input"
                  placeholder="Enter board name"
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                />

                <label>Brokerage name</label>
                <input
                  type="text"
                  className="join-input"
                  placeholder="Enter brokerage name"
                  value={broker}
                  onChange={(e) => setBroker(e.target.value)}
                />
              </div>
            )}

            <input
              type="text"
              className="join-input referral"
              placeholder="Referral Code (Optional)"
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Join;
