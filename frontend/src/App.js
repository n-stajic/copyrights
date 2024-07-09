import TopBar from './components/TopBar/TopBar';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import A1FormListAll from './components/A1Form/A1FormListAll';
import A1CreateForm from './components/A1Form/A1CreateForm';
import A1FormShow from './components/A1Form/A1FormShow';
import Search from './components/Search/Search';

export default function App() {
    const localToken = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    if (!localToken && !(currentPath !== ' /login' || currentPath !== '/register')) {
        window.location.href = '/login';
    }

    return (
        <div className="wrapper">
            <CurrentTopBar />
            <CurrentComponent />
        </div>
    );
}

function CurrentComponent() {
    const currentPath = window.location.pathname;

    if (currentPath === '/') {
        return <A1FormListAll />;
    } else if (currentPath === '/login') {
        return <Login />;
    } else if (currentPath === '/register') {
        return <Register />;
    } else if (currentPath === '/a1-forms') {
        return <A1FormListAll />;
    } else if (currentPath === '/a1-forms/create') {
        return <A1CreateForm />;
    } else if (currentPath === '/search') {
        return <Search />;
    } else if (currentPath.includes('/a1-forms/')) {
        return <A1FormShow />;
    } else {
        return null
    }
}

function CurrentTopBar() {
    const currentPath = window.location.pathname;

    if (currentPath !== ' /login' || currentPath !== ' /register') {
        return <TopBar />
    }

    return null
}