"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Input,
  Badge,
  HStack,
  VStack,
  Grid,
  Spinner,
  Container,
  Center,
  SimpleGrid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";

// Performance measurement utility
const measurePerformance = (fn: () => void) => {
  if (typeof window === "undefined") {
    // Server-side: return a fixed value to avoid hydration mismatch
    return 1.5;
  }
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
};

// Helper function to generate simple component data
const getComponentData = (index: number) => {
  const componentType = index % 2 === 0 ? "Functional" : "Class";
  const isOptimized = index % 3 === 0; // Every 3rd component is optimized

  return {
    componentId: index,
    componentType,
    isOptimized,
  };
};

// Stress Test Scenarios
const ComponentFloodTest = () => {
  const [componentCount, setComponentCount] = useState(100);
  const [lastRenderTime, setLastRenderTime] = useState(0);

  const addComponents = () => {
    const renderTime = measurePerformance(() => {
      setComponentCount((prev) => prev + 1000);
    });
    setLastRenderTime(renderTime);
  };

  return (
    <Box p={4} border="1px solid" borderRadius="md" mb={4}>
      <Heading size="md" mb={4}>
        Component Flood Test
      </Heading>
      <HStack mb={4}>
        <Text>Component Count:</Text>
        <Input
          type="number"
          value={componentCount}
          onChange={(e) => setComponentCount(Number(e.target.value))}
          w="100px"
        />
        <Button onClick={addComponents}>Add 1000 Components</Button>
        <Button onClick={() => setComponentCount(100)} colorScheme="gray">
          Reset
        </Button>
      </HStack>

      <Text mb={4} fontSize="sm" color="gray.600">
        Total components: {componentCount}
      </Text>

      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={2}>
        {Array(componentCount)
          .fill(0)
          .map((_, i) => {
            const componentData = getComponentData(i);
            return (
              <Popover key={i} trigger="hover" placement="top">
                <PopoverTrigger>
                  <Card
                    size="sm"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      transform: "scale(1.02)",
                      shadow: "lg",
                      borderColor: "blue.300",
                    }}
                  >
                    <CardBody>
                      <Text>Component {i}</Text>
                      <Button size="sm" colorScheme="blue">
                        Action {i}
                      </Button>
                    </CardBody>
                  </Card>
                </PopoverTrigger>
                <PopoverContent maxW="400px">
                  <PopoverArrow />
                  <PopoverBody>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      color="blue.500"
                      mb={2}
                    >
                      Component Details
                    </Text>
                    <Text fontSize="xs">ID: {componentData.componentId}</Text>
                    <Text fontSize="xs">Type: {componentData.componentType}</Text>
                    <Text fontSize="xs">
                      Optimized: {componentData.isOptimized ? "Yes" : "No"}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            );
          })}
      </Grid>
    </Box>
  );
};

const RapidStateChangeTest = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [updatesPerSecond, setUpdatesPerSecond] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    let frameCount = 0;
    const startTime = Date.now();

    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
      frameCount++;

      // Calculate updates per second every second
      if (frameCount % 100 === 0) {
        const elapsed = (Date.now() - startTime) / 1000;
        setUpdatesPerSecond(Math.round(frameCount / elapsed));
      }
    }, 10); // 100 updates per second

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <Box p={4} border="1px solid" borderRadius="md" mb={4}>
      <Heading size="md" mb={4}>
        Rapid State Change Test
      </Heading>
      <HStack mb={4}>
        <Button
          colorScheme={isRunning ? "red" : "green"}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "Stop" : "Start"} Rapid Updates
        </Button>
        <Button
          onClick={() => {
            setCount(0);
            setUpdatesPerSecond(0);
          }}
        >
          Reset
        </Button>
      </HStack>

      <Text mb={2} fontSize="lg" fontWeight="bold">
        Count: {count.toLocaleString()}
      </Text>
      <Text mb={2}>Updates per second: {updatesPerSecond}</Text>
      <Text mb={4} fontSize="sm" color="gray.600">
        This tests how many state updates Chakra UI v2 can handle per second
      </Text>

      <Box>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <Badge key={i} colorScheme="blue" mr={2} mb={2}>
              Badge {count + i}
            </Badge>
          ))}
      </Box>
    </Box>
  );
};

// Main Stress Test Page
export default function StressTestV2() {
  const [activeTest, setActiveTest] = useState("all");

  const tests = [
    { id: "all", label: "All Tests" },
    { id: "flood", label: "Component Flood" },
    { id: "state", label: "Rapid State Changes" },
    { id: "interactive", label: "Interactive Components" },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading size="lg" mb={4}>
          Chakra UI v2 Stress Test
        </Heading>
        <Text mb={4}>
          Test Chakra UI v2 components under various stress conditions to
          evaluate performance and responsiveness.
        </Text>

        <HStack gap={2} mb={4}>
          {tests.map((test) => (
            <Button
              key={test.id}
              size="sm"
              colorScheme={activeTest === test.id ? "blue" : "gray"}
              onClick={() => setActiveTest(test.id)}
            >
              {test.label}
            </Button>
          ))}
        </HStack>
      </Box>

      <Grid templateColumns="1fr 300px" gap={6}>
        <Box>
          {(activeTest === "all" || activeTest === "flood") && (
            <ComponentFloodTest />
          )}
          {(activeTest === "all" || activeTest === "state") && (
            <RapidStateChangeTest />
          )}
          {activeTest === "interactive" && (
            <Box p={4} border="1px solid" borderRadius="md" mb={4}>
              <Heading size="md" mb={4}>
                Interactive Component Test
              </Heading>
              <Text mb={4}>
                Test various interactive Chakra UI v2 components and their
                responsiveness.
              </Text>
            </Box>
          )}
        </Box>
      </Grid>
    </Container>
  );
}