import PageCard from "../../components/pageCard/PageCard";
import PageCardHead from "../../components/pageCard/PageCardHead";

export default function EmployeeList(): React.ReactElement {
  return (
    <PageCard width="lg">
      <PageCardHead
        title={"Current employees"}
        button={{
          label: "Home",
          to: "/",
        }}
      />
    </PageCard>
  );
}
