import { Modal, ProviderList } from "@repo/ui";

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
        <ProviderList />
      </div>
    </Modal>
  );
};

export { OAuthModal };
