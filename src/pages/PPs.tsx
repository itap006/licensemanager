import Container from 'layout/Container';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';

const PPs = () => {
  const history = useHistory();
  const { pId, oId } = useParams<{ pId: string; oId: string }>();
  const { data } = useQuery<any>(`getproductorganisation/${pId}/${oId}`);

  return (
    <Container>
      {data && (
        <div>
          <div className="mb-2 font-bold">Name: {data.organisation.name + '-' + data.product.name}</div>
          <div>
            {data.publicPrivateKeys.map((e: any) => (
              <div
                key={e.id}
                className="p-2 mb-2 break-words border border-solid border-gray-400 rounded cursor-pointer"
                onClick={() => history.push(`/license/${e.id}`)}
              >
                <div>Created: {e.createdDate}</div>
                <div className="text-green-400 mb-1">Public</div>
                <div>{e.publicKey}</div>
                <div className="text-red-400 mb-1">Private</div>
                <div>{e.privateKey}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default PPs;
