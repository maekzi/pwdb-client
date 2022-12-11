import { useState } from "react";
import { SimpleGrid, Progress } from "@chakra-ui/react";

import { useGetProjectsQuery } from "../../../app/services/projectApiSlice";
import type { ProjectWhereInput } from "../../../types/pwdbApiTypes";

import ListItem from "./ListItem";

const ProjectList = () => {
  const [listFilter] = useState<ProjectWhereInput>({});

  const {
    data: projects,
    isFetching,
    isLoading,
  } = useGetProjectsQuery(listFilter, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  if (isLoading)
    return (
      <Progress
        mt={-4}
        mx={-4}
        size="sm"
        isIndeterminate
        colorScheme="purple"
      />
    );
  if (!projects) return <div>Missing Projects!</div>;

  return (
    <>
      {isFetching ? (
        <Progress
          mt={-4}
          mx={-4}
          size="sm"
          isIndeterminate
          colorScheme="purple"
        />
      ) : (
        <SimpleGrid color="white" columns={{ sm: 1, lg: 2 }} spacing={4}>
          {projects.map((project) => (
            <ListItem project={project} key={project.id.toString()} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default ProjectList;
