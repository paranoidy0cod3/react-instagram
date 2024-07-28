import { Route, Routes, Navigate } from "react-router-dom";
import { Home, Auth } from "./pages";
import PageLayout from "./layouts/PageLayout";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

function App() {
  // const [user] = useAuthState(auth);
  const userStat = useSelector((state) => state.auth.userData);

  return (
    <>
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={userStat ? <Home /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="auth"
            element={!userStat ? <Auth /> : <Navigate to={"/"} />}
          />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
