import Properties from "./Properties";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";
import getMyProperties from "@/app/utils/getMyProperties";

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
