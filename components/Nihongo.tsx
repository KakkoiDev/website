import SubPage, { LinkGroups, prose } from "@/components/SubPage";
import { nihongo } from "@/data";

// English only: the audience is English speakers learning Japanese.
export default function Nihongo() {
  return (
    <SubPage title={nihongo.title} lead={<p className={prose}>{nihongo.intro}</p>}>
      <LinkGroups groups={nihongo.groups} />
    </SubPage>
  );
}
