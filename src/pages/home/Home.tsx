import CreateEmployeeForm from "../../components/createEmployeeForm/CreateEmployeeForm";
import Header from "../../components/header/Header";
import PageCard from "../../components/pageCard/PageCard";
import PageCardHead from "../../components/pageCard/PageCardHead";

export default function Home(): React.ReactElement {
  return (
    <>
      <Header />
      <PageCard width="sm">
        <PageCardHead
          title="Create employee"
          button={{
            label: "View current employees",
            to: "/employee-list",
          }}
        />
        <CreateEmployeeForm />
      </PageCard>
    </>
  );
}
