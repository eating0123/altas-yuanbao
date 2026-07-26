import ConversationExperience from "../../components/ConversationExperience";
import { scenes } from "../../product-data";

export function generateStaticParams() {
  return scenes.map((scene) => ({ id: scene.id }));
}

export default async function ScenePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ConversationExperience sceneId={id} />;
}
