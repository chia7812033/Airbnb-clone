import getCurrentUser from "../actions/getCurrentUser";
import getMyProperties from "../actions/getMyProperties";
import EmptyState from "../components/EmptyState";
import Properties from "./Properties";

const Propertiespage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title={"Not logged in"} subtitle={"Please login first"} />
    );
  }

  const properties = await getMyProperties();

  if (properties.length === 0) {
    return <EmptyState />;
  }

  return <Properties currentUser={currentUser} properties={properties} />;
};

export default Propertiespage;
