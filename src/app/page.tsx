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

// Popover component with manual state management and stress event listeners
const PopoverWithState = ({
  componentData,
  index,
}: {
  componentData: any;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [moveCount, setMoveCount] = useState(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  const handleMouseMove = () => {
    setMoveCount((prev) => prev + 1);
  };

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} placement="top">
      <PopoverTrigger>
        <Card
          size="sm"
          cursor="pointer"
          transition="all 0.2s"
          data-testid="component-card"
          _hover={{
            transform: "scale(1.02)",
            shadow: "lg",
            borderColor: "blue.300",
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
        >
          <CardBody>
            <Text>Component {index}</Text>
            <Button size="sm" colorScheme="blue" onClick={handleClick}>
              Action {index} (Clicks: {clickCount})
            </Button>
            <Text fontSize="xs" color="gray.500">
              Moves: {moveCount}
            </Text>
          </CardBody>
        </Card>
      </PopoverTrigger>
      <PopoverContent maxW="400px">
        <PopoverArrow />
        <PopoverBody>
          <Text fontSize="sm" fontWeight="bold" color="blue.500" mb={2}>
            Component Details WITH STATE MANAGEMENT
          </Text>
          <Text fontSize="xs">ID: {componentData.componentId}</Text>
          <Text fontSize="xs">Type: {componentData.componentType}</Text>
          <Text fontSize="xs">
            Optimized: {componentData.isOptimized ? "Yes" : "No"}
          </Text>
          <Text fontSize="xs" color="green.500">
            Clicks: {clickCount} | Moves: {moveCount}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

// Automated Performance Test
const AutomatedPerformanceTest = ({
  onSetComponentCount,
}: {
  onSetComponentCount: (count: number) => void;
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [selectedCount, setSelectedCount] = useState(10000);

  const runPerformanceTest = async () => {
    // Set loading state immediately
    setIsRunning(true);
    setTestResults(null);
    setCurrentStep(0);

    // Small delay to ensure UI updates
    await new Promise((resolve) => setTimeout(resolve, 10));

    const results = {
      totalTime: 0,
      finalComponentCount: 0,
      renderTime: 0,
      scrollTime: 0,
    };

    // Start timing
    const startTime = performance.now();
    setCurrentStep(1);

    // Update state to render selected number of components
    onSetComponentCount(selectedCount);

    // Wait for all components to be rendered
    await new Promise((resolve) => {
      const checkDOM = () => {
        const componentElements = document.querySelectorAll(
          '[data-testid="component-card"]'
        );
        const allCards = document.querySelectorAll(".chakra-card");
        const actualCount = Math.max(componentElements.length, allCards.length);

        console.log(
          `Found ${actualCount} components, waiting for ${selectedCount}...`
        );

        if (actualCount >= selectedCount) {
          results.finalComponentCount = actualCount;
          resolve(true);
        } else {
          // Timeout after 15 seconds
          if (performance.now() - startTime > 15000) {
            console.log("Timeout reached, proceeding with current count");
            results.finalComponentCount = actualCount;
            resolve(true);
          } else {
            setTimeout(checkDOM, 50); // Check every 50ms
          }
        }
      };
      checkDOM();
    });

    // Record render completion time
    const renderEndTime = performance.now();
    results.renderTime = renderEndTime - startTime;

    // Start scroll testing
    console.log("Starting scroll test...");
    const scrollStartTime = performance.now();

    // Scroll the entire page
    console.log("Starting page scroll test...");
    console.log("Page scrollWidth:", document.documentElement.scrollWidth);
    console.log("Page scrollHeight:", document.documentElement.scrollHeight);
    console.log("Page clientWidth:", document.documentElement.clientWidth);
    console.log("Page clientHeight:", document.documentElement.clientHeight);

    // Add visual indicator to body
    const originalBodyStyle = document.body.style.border;
    document.body.style.border = "5px solid red";

    // Horizontal scroll test: left to right
    console.log("Scrolling page right...", "scrollLeft:", window.pageXOffset);
    window.scrollTo(document.documentElement.scrollWidth, 0);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for scroll to complete
    console.log("After right scroll:", "scrollLeft:", window.pageXOffset);

    // Horizontal scroll test: right to left
    console.log("Scrolling page left...");
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for scroll to complete
    console.log("After left scroll:", "scrollLeft:", window.pageXOffset);

    // Vertical scroll test: top to bottom
    console.log("Scrolling page down...", "scrollTop:", window.pageYOffset);
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for scroll to complete
    console.log("After down scroll:", "scrollTop:", window.pageYOffset);

    // Vertical scroll test: bottom to top
    console.log("Scrolling page up...");
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for scroll to complete
    console.log("After up scroll:", "scrollTop:", window.pageYOffset);

    // Remove visual indicator
    document.body.style.border = originalBodyStyle;

    const scrollEndTime = performance.now();
    results.scrollTime = scrollEndTime - scrollStartTime;

    // End timing
    const endTime = performance.now();
    results.totalTime = endTime - startTime;

    setTestResults(results);
    setIsRunning(false);
    setCurrentStep(0);

    // Reset components back to 100 after scroll test completion
    setIsResetting(true);
    onSetComponentCount(100);
    setTimeout(() => {
      setIsResetting(false);
    }, 500); // Show resetting indicator for 500ms
  };

  return (
    <Box p={4} border="1px solid" borderRadius="md" mb={4} bg="gray.50">
      <Heading size="md" mb={4} color="purple.600">
        🚀 Automated Performance Test
      </Heading>

      <VStack align="start" spacing={4}>
        {/* Component Count Selection */}
        <Box>
          <Text mb={2} fontWeight="bold">
            Select Component Count:
          </Text>
          <HStack spacing={2} wrap="wrap">
            {[2000, 5000, 10000, 20000].map((count) => (
              <Button
                key={count}
                size="sm"
                colorScheme={selectedCount === count ? "blue" : "gray"}
                variant={selectedCount === count ? "solid" : "outline"}
                onClick={() => setSelectedCount(count)}
                isDisabled={isRunning}
              >
                {count.toLocaleString()}
              </Button>
            ))}
          </HStack>
        </Box>

        <Button
          colorScheme="purple"
          size="lg"
          onClick={runPerformanceTest}
          isLoading={isRunning}
          loadingText={`Running test...`}
          disabled={isRunning}
        >
          Start Performance Test
        </Button>

        {isRunning && (
          <Box>
            <Text>
              Rendering {selectedCount.toLocaleString()} components...
            </Text>
            <Text>Measuring total render time...</Text>
            <Text>Please wait...</Text>
          </Box>
        )}

        {isResetting && (
          <Box>
            <Text color="orange.500">Resetting components back to 100...</Text>
          </Box>
        )}

        {testResults && (
          <Box
            p={4}
            bg="white"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <Heading size="sm" mb={3} color="green.600">
              ✅ Test Results
            </Heading>

            <VStack align="start" spacing={2}>
              <Text fontSize="lg" fontWeight="bold" color="green.600">
                <strong>Total Test Time:</strong>{" "}
                {testResults.totalTime.toFixed(2)}ms
              </Text>
              <Text>
                <strong>Components Rendered:</strong>{" "}
                {testResults.finalComponentCount.toLocaleString()}
              </Text>
              <Text>
                <strong>Render Time:</strong>{" "}
                {testResults.renderTime.toFixed(2)}ms
              </Text>
              <Text>
                <strong>Scroll Test Time:</strong>{" "}
                {testResults.scrollTime.toFixed(2)}ms
              </Text>
              <Text>
                <strong>Components per Second:</strong>{" "}
                {Math.round(
                  testResults.finalComponentCount /
                    (testResults.renderTime / 1000)
                ).toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Complete test: render + scroll for{" "}
                {selectedCount.toLocaleString()} Chakra UI v2 components
              </Text>
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

// Stress Test Scenarios
const ComponentFloodTest = ({
  componentCount,
  setComponentCount,
}: {
  componentCount: number;
  setComponentCount: (count: number) => void;
}) => {
  const [lastRenderTime, setLastRenderTime] = useState(0);

  const addComponents = () => {
    const renderTime = measurePerformance(() => {
      setComponentCount((prev) => prev + 1000);
    });
    setLastRenderTime(renderTime);
  };

  return (
    <Box
      p={4}
      border="1px solid"
      borderRadius="md"
      mb={4}
      data-testid="component-flood-test"
    >
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
        Total components: {componentCount} | Table:{" "}
        {Math.ceil(Math.sqrt(componentCount))} rows ×{" "}
        {Math.ceil(componentCount / Math.ceil(Math.sqrt(componentCount)))}{" "}
        columns
      </Text>

      <Box overflowX="auto" overflowY="auto">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {(() => {
              // Calculate optimal grid dimensions
              const totalComponents = componentCount;

              // Calculate square root to get balanced dimensions
              const sqrt = Math.sqrt(totalComponents);
              const maxRows = Math.ceil(sqrt);
              const maxCols = Math.ceil(totalComponents / maxRows);

              // Create rows
              return Array(maxRows)
                .fill(0)
                .map((_, rowIndex) => {
                  return (
                    <tr key={rowIndex}>
                      {Array(maxCols)
                        .fill(0)
                        .map((_, colIndex) => {
                          const componentIndex = colIndex * maxRows + rowIndex;

                          if (componentIndex >= totalComponents) {
                            return (
                              <td
                                key={colIndex}
                                style={{ padding: "4px", minWidth: "200px" }}
                              ></td>
                            );
                          }

                          const componentData =
                            getComponentData(componentIndex);
                          return (
                            <td
                              key={colIndex}
                              style={{ padding: "4px", minWidth: "200px" }}
                            >
                              <PopoverWithState
                                componentData={componentData}
                                index={componentIndex}
                              />
                            </td>
                          );
                        })}
                    </tr>
                  );
                });
            })()}
          </tbody>
        </table>
      </Box>
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
  const [componentCount, setComponentCount] = useState(100);

  const tests = [
    { id: "all", label: "All Tests" },
    { id: "automated", label: "🚀 Automated Performance Test" },
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
          {(activeTest === "all" || activeTest === "automated") && (
            <AutomatedPerformanceTest onSetComponentCount={setComponentCount} />
          )}
          {(activeTest === "all" || activeTest === "flood") && (
            <ComponentFloodTest
              componentCount={componentCount}
              setComponentCount={setComponentCount}
            />
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
