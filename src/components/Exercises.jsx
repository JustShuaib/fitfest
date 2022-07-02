import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ exercises, bodyPart, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  const paginate = (_, value) => {
    setCurrentPage(value);
    document.getElementById("exercises").scrollIntoView({ behavior: "smooth" });
  };

  return exercises.length === 0 && !error ? (
    <Box textAlign="center">
      <Typography
        fontSize={{ xs: "1.4rem", lg: "1.8rem" }}
        fontFamily="Josefin Sans"
      >
        No such exercise exist :(
      </Typography>
    </Box>
  ) : (
    <Box
      id="exercises"
      p="1.4rem"
      sx={{ mt: { xs: "3.125rem", lg: "6.875rem" } }}
    >
      {" "}
      {exercises.length > 0 && (
        <Typography mb="2.875rem" fontSize="2rem" fontWeight={700}>
          {" "}
          {bodyPart === "all" ? "Showing Exercises" : "Showing Result"}
        </Typography>
      )}
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        sx={{ gap: { lg: "2.5rem", xs: "3.125rem" } }}
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="6.25rem" alignItems="center">
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
