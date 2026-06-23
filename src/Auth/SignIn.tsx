import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

type SignInErrors = {
  email?: string;
  password?: string;
};

type SignUpData = {
  country: string;
  city: string;
};

export default function SignIn() {
  const navigate = useNavigate();

  // SIGN IN
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signInErrors, setSignInErrors] = useState<SignInErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  // SIGN UP (location only for now)
  const [signUpData, setSignUpData] = useState<SignUpData>({
    country: "",
    city: "",
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // ======================
  // VALIDATION
  // ======================
  const validateSignIn = () => {
    const errors: SignInErrors = {};
    if (!signInData.email.trim()) errors.email = "Email is required";
    if (!signInData.password.trim()) errors.password = "Password is required";
    return errors;
  };

  // ======================
  // COUNTRIES API
  // ======================
  useEffect(() => {
    setLoadingCountries(true);

    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        const list = data
          .map((c: any) => c?.name?.common)
          .filter(Boolean)
          .sort((a: string, b: string) => a.localeCompare(b));

        setCountries(list);
      })
      .catch(() => setCountries([]))
      .finally(() => setLoadingCountries(false));
  }, []);

  // ======================
  // CITIES API (based on country)
  // ======================
  useEffect(() => {
    if (!signUpData.country) {
      setCities([]);
      return;
    }

    setLoadingCities(true);
    setSignUpData((p) => ({ ...p, city: "" }));

    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: signUpData.country }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCities(data?.data || []);
      })
      .catch(() => setCities([]))
      .finally(() => setLoadingCities(false));
  }, [signUpData.country]);

  // ======================
  // SUBMIT SIGN IN
  // ======================
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateSignIn();
    setSignInErrors(errors);

    if (Object.keys(errors).length > 0) return;

    navigate("/projects");
  };

  return (
    <div className="sign-in-container">
      <div className="form-container">
        {/* TABS */}
        <div className="tab-list">
          <button onClick={() => setActiveTab("signin")}>Sign In</button>
          <button onClick={() => setActiveTab("signup")}>Sign Up</button>
        </div>

        {/* SIGN IN */}
        {activeTab === "signin" && (
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              value={signInData.email}
              onChange={(e) =>
                setSignInData({ ...signInData, email: e.target.value })
              }
            />
            {signInErrors.email && <p>{signInErrors.email}</p>}

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={signInData.password}
              onChange={(e) =>
                setSignInData({ ...signInData, password: e.target.value })
              }
            />
            {signInErrors.password && <p>{signInErrors.password}</p>}

            <button type="button" onClick={() => setShowPassword((p) => !p)}>
              Toggle Password
            </button>

            <button type="submit">Sign In</button>
          </form>
        )}

        {/* SIGN UP (Country + City only) */}
        {activeTab === "signup" && (
          <div>
            <select
              value={signUpData.country}
              onChange={(e) =>
                setSignUpData({ ...signUpData, country: e.target.value })
              }
            >
              <option value="">
                {loadingCountries ? "Loading..." : "Select Country"}
              </option>

              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={signUpData.city}
              onChange={(e) =>
                setSignUpData({ ...signUpData, city: e.target.value })
              }
              disabled={!signUpData.country}
            >
              <option value="">
                {loadingCities ? "Loading..." : "Select City"}
              </option>

              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}