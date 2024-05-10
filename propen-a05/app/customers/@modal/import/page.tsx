import Form from '../../_components/ImportForm';
import Modal from '../../_components/Modal';

interface PageProps {
	//
}

const Page: React.FC<PageProps> = async () => {
	return (
		<Modal>
			<Form />
		</Modal>
	);
};

export default Page;
