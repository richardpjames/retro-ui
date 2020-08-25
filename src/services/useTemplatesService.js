import useApi from './useAPI';

const useTemplatesService = () => {
  const api = useApi();

  const getAll = async () => {
    return api.get(`/api/templates`);
  };

  return { getAll };
};

export default useTemplatesService;
