type Props = {
  onClick: () => void;
};

const LogoutButton = ({ onClick }: Props) => (
  <button
    className="text-sm font-bold p-2 px-5 shadow-md rounded-lg"
    onClick={onClick}
  >
    Logout
  </button>
);

export default LogoutButton;
