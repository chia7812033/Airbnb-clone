import Properties from "./Properties";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getMyProperties from "@/app/actions/getMyProperties";
import EmptyState from "@/app/components/ui/EmptyState";

export const metadata = {
  title: "My Properties",
};

const Propertiespage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title={"Not logged in"} />;
  }

  const properties = await getMyProperties();

  if (properties.length === 0) {
    return <EmptyState />;
  }

  return <Properties currentUser={currentUser} properties={properties} />;
};

export default Propertiespage;
