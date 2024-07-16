import { useMutation } from '@apollo/client';
import { DELETE_TRANSACTION } from '@/graphql/apollo-client/mutations';

export default function DeleteButton({id} : {id: number}) {
   // apollo client
   const [deleteTransaction] = useMutation(DELETE_TRANSACTION);
   
    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        confirm('¿Estás seguro de eliminar esta transacción?');
        try {
        await deleteTransaction({ variables: { deleteTransactionId: id } });
        setTimeout(() => {
            window.location.replace('/ingresos-egresos');
        }, 500);
        } catch (error) {
        console.error('Error Al eliminar transaction', error);
        }
    };
  return (
    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-[15px] text-white font-medium flex items-center gap-2 py-2 px-3 rounded-lg">
        <span>Eliminar</span>
    </button>
  )
}
