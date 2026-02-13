import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sheetApi } from "../services/sheetApi";

export const useSheetData = (refreshInterval = 300000) => { // 5 minutes
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['departments'],
    queryFn: sheetApi.getAllDepartments,
    refetchInterval: refreshInterval,
    staleTime: 60000, // 1 minute
    onError: (err) => {
      console.error('Failed to fetch sheet data:', err);
    }
  });

  // Get all students flattened with department info
  const getAllStudents = () => {
    if (!data) return [];
    const students = [];
    Object.entries(data).forEach(([dept, deptStudents]) => {
      deptStudents.forEach(student => {
        students.push({ ...student, department: dept });
      });
    });
    return students;
  };

  // Get students by status
  const getStudentsByStatus = (status) => {
    const all = getAllStudents();
    return all.filter(s => s.status === status);
  };

  // Department-specific getters
  const getDepartment = (deptName) => data?.[deptName] || [];

  return {
    departments: data || {},
    allStudents: getAllStudents(),
    activeStudents: getStudentsByStatus('active'),
    warningStudents: getStudentsByStatus('warning'),
    atRiskStudents: getStudentsByStatus('at-risk'),
    csbs: data?.CSBS || [],
    cse: data?.CSE || [],
    it: data?.IT || [],
    ece: data?.ECE || [],
    mech: data?.MECH || [],
    loading: isLoading,
    error,
    refresh: refetch,
    lastUpdated: new Date().toISOString()
  };
};

/**
 * Hook for adding new document to MongoDB
 */
export const useAddDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData) => sheetApi.addDocument(newData),
    onSuccess: () => {
      // Refetch departments after adding
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: (error) => {
      console.error('Failed to add document:', error);
    }
  });
};

/**
 * Hook for updating document in MongoDB
 */
export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => sheetApi.updateDocument(id, data),
    onSuccess: () => {
      // Refetch departments after updating
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: (error) => {
      console.error('Failed to update document:', error);
    }
  });
};

/**
 * Hook for deleting document from MongoDB
 */
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => sheetApi.deleteDocument(id),
    onSuccess: () => {
      // Refetch departments after deleting
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: (error) => {
      console.error('Failed to delete document:', error);
    }
  });
};