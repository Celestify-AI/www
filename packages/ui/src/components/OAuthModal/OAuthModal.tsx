import { Modal } from "@repo/ui/modal";
import { IntegrationCard } from "@repo/ui/integration-card";

interface OAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OAuthModal = ({ isOpen, onClose }: OAuthModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mt-18 flex flex-col items-center">
        <h1 className="font-bold text-xl text-center">
          Add connections to Celestify
        </h1>
        <h2 className="font-mono text-(--muted) text-sm text-center">
          Integrate Celestify with other platforms
        </h2>
      </div>
      <div className="mt-8 flex flex-col gap-4 items-center px-4">
        <IntegrationCard
          platformSlug="google-drive"
          platformName="Google Drive"
          description="Allow Celestify to read Google Drive files"
          connected={true}
          oauthUrl="https://celestify.ai"
        />
        <IntegrationCard
          platformSlug="gmail"
          platformName="Gmail"
          description="Allow Celestify to read your Gmail inbox"
          connected={false}
          oauthUrl="https://celestify.ai"
        />
      </div>
    </Modal>
  );
};

export { OAuthModal };
