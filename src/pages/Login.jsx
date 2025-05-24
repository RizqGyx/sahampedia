import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, BookOpen, Layers, FileText } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required.";
    else if (username.length < 3)
      newErrors.username = "Username must be at least 3 characters.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 3)
      newErrors.password = "Password must be at least 3 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await login(username, password);
    if (success) {
      navigate("/admin");
    }
  };

  return (
    <Layout hideHeader={true} hideFooter={true} hidecontainer={true}>
      <div className="min-h-screen flex flex-col md:flex-row text-foreground transition-colors">
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-10">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-primary mb-6">
              Learning Management System
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Administrate your courses, modules, lessons, and content from a
              single dashboard.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <InfoCard
                icon={<BookOpen className="h-6 w-6" />}
                title="Course Management"
                desc="Organize educational content"
              />
              <InfoCard
                icon={<Layers className="h-6 w-6" />}
                title="Content Library"
                desc="Manage multimedia resources"
              />
              <InfoCard
                icon={<FileText className="h-6 w-6" />}
                title="Journal Archive"
                desc="Academic reference tracking"
              />
              <InfoCard
                icon={
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    24/7
                  </div>
                }
                title="Always Available"
                desc="Access anytime, anywhere"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">
                Admin Login
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                    className="w-full"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">{errors.username}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="w-full"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
                <div className="w-full flex justify-center gap-2">
                  <p className="text-sm text-muted-foreground">Not An Admin?</p>
                  <Link
                    to="/"
                    className="text-sm text-blue-400 hover:underline underline hover:text-blue-600 transition-colors"
                  >
                    Back To Home
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

const InfoCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
    <div className="text-primary mb-3">{icon}</div>
    <h3 className="font-medium text-center">{title}</h3>
    <p className="text-sm text-center text-muted-foreground mt-2">{desc}</p>
  </div>
);

export default Login;
