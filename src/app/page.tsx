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

// Style-Heavy Component Test - Tests CSS-in-JS performance
const StyleHeavyComponent = ({ index }: { index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} placement="top">
      <PopoverTrigger>
        <Box
          w="200px"
          h="150px"
          p={4}
          m={2}
          bg="red.500"
          color="white"
          borderRadius="md"
          shadow="lg"
          border="2px solid"
          borderColor="red.600"
          cursor="pointer"
          transition="all 0.3s ease"
          transform={isHovered ? "scale(1.05)" : "scale(1)"}
          rotate={isHovered ? "2deg" : "0deg"}
          _hover={{
            bg: "red.600",
            shadow: "xl",
            borderColor: "red.700",
            transform: "scale(1.1) rotate(3deg)",
          }}
          _active={{
            bg: "red.700",
            transform: "scale(0.95)",
          }}
          _focus={{
            outline: "2px solid",
            outlineColor: "blue.500",
            outlineOffset: "2px",
          }}
          onMouseEnter={() => {
            setIsHovered(true);
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsOpen(false);
          }}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          data-testid="style-heavy-component"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Style Test {index}
          </Text>
          <Text fontSize="sm" opacity={0.9}>
            Hover: {isHovered ? "Yes" : "No"}
          </Text>
          <Text fontSize="sm" opacity={0.9}>
            Active: {isActive ? "Yes" : "No"}
          </Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent maxW="400px">
        <PopoverArrow />
        <PopoverBody>
          <Text fontSize="sm" fontWeight="bold" color="red.500" mb={2}>
            Style-Heavy Component Details
          </Text>
          <Text fontSize="xs">Component Index: {index}</Text>
          <Text fontSize="xs">Hover State: {isHovered ? "Yes" : "No"}</Text>
          <Text fontSize="xs">Active State: {isActive ? "Yes" : "No"}</Text>
          <Text fontSize="xs" color="gray.600">
            This component tests CSS-in-JS performance with many style props
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

// Responsive Component Test - Tests responsive design performance
const ResponsiveComponent = ({ index }: { index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} placement="top">
      <PopoverTrigger>
        <Box
          w={{ base: "100%", sm: "50%", md: "33%", lg: "25%", xl: "20%" }}
          h={{
            base: "100px",
            sm: "120px",
            md: "140px",
            lg: "160px",
            xl: "180px",
          }}
          p={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
          m={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          bg={{
            base: "blue.100",
            sm: "blue.200",
            md: "blue.300",
            lg: "blue.400",
            xl: "blue.500",
          }}
          color={{
            base: "blue.800",
            sm: "blue.700",
            md: "blue.600",
            lg: "blue.100",
            xl: "white",
          }}
          borderRadius={{ base: "sm", sm: "md", md: "lg", lg: "xl", xl: "2xl" }}
          fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
          fontWeight={{
            base: "normal",
            sm: "medium",
            md: "semibold",
            lg: "bold",
            xl: "extrabold",
          }}
          shadow={{ base: "sm", sm: "md", md: "lg", lg: "xl", xl: "2xl" }}
          border="1px solid"
          borderColor={{
            base: "blue.200",
            sm: "blue.300",
            md: "blue.400",
            lg: "blue.500",
            xl: "blue.600",
          }}
          _hover={{
            bg: {
              base: "blue.200",
              sm: "blue.300",
              md: "blue.400",
              lg: "blue.500",
              xl: "blue.600",
            },
            transform: "scale(1.02)",
            shadow: "2xl",
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          data-testid="responsive-component"
        >
          <Text>Responsive {index}</Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent maxW="400px">
        <PopoverArrow />
        <PopoverBody>
          <Text fontSize="sm" fontWeight="bold" color="blue.500" mb={2}>
            Responsive Component Details
          </Text>
          <Text fontSize="xs">Component Index: {index}</Text>
          <Text fontSize="xs" color="gray.600">
            This component tests responsive design performance with many
            breakpoint props
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

// Animation Component Test - Tests animation performance
const AnimationComponent = ({ index }: { index: number }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} placement="top">
      <PopoverTrigger>
        <Box
          w="150px"
          h="150px"
          color="white"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
          transform={
            isAnimating ? "scale(1.2) rotate(180deg)" : "scale(1) rotate(0deg)"
          }
          bg={isAnimating ? "purple.500" : "green.500"}
          shadow={isAnimating ? "2xl" : "lg"}
          _hover={{
            transform: "scale(1.1) rotate(90deg)",
            bg: "yellow.500",
            shadow: "xl",
          }}
          onClick={() => setIsAnimating(!isAnimating)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          data-testid="animation-component"
        >
          <Text fontSize="sm" fontWeight="bold">
            {isAnimating ? "Animating!" : `Anim ${index}`}
          </Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent maxW="400px">
        <PopoverArrow />
        <PopoverBody>
          <Text fontSize="sm" fontWeight="bold" color="green.500" mb={2}>
            Animation Component Details
          </Text>
          <Text fontSize="xs">Component Index: {index}</Text>
          <Text fontSize="xs">Animating: {isAnimating ? "Yes" : "No"}</Text>
          <Text fontSize="xs" color="gray.600">
            This component tests animation performance with CSS transitions
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

// Form Component Test - Tests form component performance
const FormComponent = ({ index }: { index: number }) => {
  const [value, setValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} placement="top">
      <PopoverTrigger>
        <Box
          p={3}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          w="250px"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Text fontSize="sm" mb={2} fontWeight="medium">
            Form Test {index}
          </Text>
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setIsInvalid(e.target.value.length < 3);
            }}
            placeholder="Type something..."
            _invalid={{ borderColor: "red.500" }}
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", shadow: "0 0 0 1px blue.500" }}
            data-testid="form-component"
          />
          <Text
            fontSize="xs"
            color={isInvalid ? "red.500" : "green.500"}
            mt={1}
          >
            {isInvalid ? "Too short!" : "Valid input"}
          </Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent maxW="400px">
        <PopoverArrow />
        <PopoverBody>
          <Text fontSize="sm" fontWeight="bold" color="purple.500" mb={2}>
            Form Component Details
          </Text>
          <Text fontSize="xs">Component Index: {index}</Text>
          <Text fontSize="xs">Value: {value || "Empty"}</Text>
          <Text fontSize="xs">Valid: {isInvalid ? "No" : "Yes"}</Text>
          <Text fontSize="xs" color="gray.600">
            This component tests form validation and input performance
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
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

// UI Library Performance Test - Tests actual Chakra UI performance
const UILibraryPerformanceTest = ({
  onSetComponentCount,
}: {
  onSetComponentCount: (count: number) => void;
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [selectedTest, setSelectedTest] = useState("style-heavy");
  const [componentCount, setComponentCount] = useState(2000);
  const [progress, setProgress] = useState("");

  const testTypes = [
    {
      id: "style-heavy",
      label: "Style-Heavy Components",
      component: StyleHeavyComponent,
    },
    {
      id: "responsive",
      label: "Responsive Components",
      component: ResponsiveComponent,
    },
    {
      id: "animation",
      label: "Animation Components",
      component: AnimationComponent,
    },
    { id: "form", label: "Form Components", component: FormComponent },
  ];

  const runUIPerformanceTest = async () => {
    setIsRunning(true);
    setTestResults(null);
    setProgress("Starting test...");

    const results = {
      totalTime: 0,
      renderTime: 0,
      styleProcessingTime: 0,
      finalComponentCount: 0,
    };

    const startTime = performance.now();

    // Test style processing performance
    setProgress("Testing CSS-in-JS performance...");
    const styleStartTime = performance.now();

    // Create a temporary element to test style processing
    const tempDiv = document.createElement("div");
    tempDiv.style.cssText = `
      background-color: red;
      color: white;
      padding: 16px;
      margin: 8px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 2px solid #e53e3e;
      cursor: pointer;
      transition: all 0.3s ease;
      transform: scale(1);
    `;
    document.body.appendChild(tempDiv);

    // Simulate style processing
    for (let i = 0; i < componentCount; i++) {
      tempDiv.style.backgroundColor = i % 2 === 0 ? "red" : "blue";
      tempDiv.style.transform = `scale(${1 + i * 0.001})`;
    }

    const styleEndTime = performance.now();
    results.styleProcessingTime = styleEndTime - styleStartTime;

    document.body.removeChild(tempDiv);

    // Update component count to trigger rendering
    setProgress("Rendering components...");
    onSetComponentCount(componentCount);

    // Small delay to ensure state update
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Wait for components to render
    await new Promise((resolve) => {
      const checkDOM = () => {
        // Use a more reliable selector based on the selected test
        let selector = "";
        switch (selectedTest) {
          case "style-heavy":
            selector = '[data-testid="style-heavy-component"]';
            break;
          case "responsive":
            selector = '[data-testid="responsive-component"]';
            break;
          case "animation":
            selector = '[data-testid="animation-component"]';
            break;
          case "form":
            selector = '[data-testid="form-component"]';
            break;
          default:
            selector = '[data-testid*="component"]';
        }

        const componentElements = document.querySelectorAll(selector);
        console.log(
          `Found ${componentElements.length} components, waiting for ${componentCount}...`
        );
        setProgress(
          `Found ${componentElements.length}/${componentCount} components...`
        );

        if (componentElements.length >= componentCount) {
          results.finalComponentCount = componentElements.length;
          setProgress("Components rendered! Calculating results...");
          resolve(true);
        } else {
          // Timeout after 10 seconds
          if (performance.now() - startTime > 10000) {
            console.log("Timeout reached, proceeding with current count");
            results.finalComponentCount = componentElements.length;
            setProgress("Timeout reached, proceeding with current count...");
            resolve(true);
          } else {
            setTimeout(checkDOM, 100);
          }
        }
      };
      checkDOM();
    });

    const renderEndTime = performance.now();
    results.renderTime = renderEndTime - startTime;
    results.totalTime = renderEndTime - startTime;

    setTestResults(results);
    setIsRunning(false);
  };

  return (
    <Box p={4} border="1px solid" borderRadius="md" mb={4} bg="purple.50">
      <Heading size="md" mb={4} color="purple.600">
        🎨 UI Library Performance Test
      </Heading>

      <VStack align="start" gap={4}>
        {/* Test Type Selection */}
        <Box>
          <Text mb={2} fontWeight="bold">
            Select Test Type:
          </Text>
          <HStack gap={2} wrap="wrap">
            {testTypes.map((test) => (
              <Button
                key={test.id}
                size="sm"
                colorScheme={selectedTest === test.id ? "purple" : "gray"}
                variant={selectedTest === test.id ? "solid" : "outline"}
                onClick={() => setSelectedTest(test.id)}
                disabled={isRunning}
              >
                {test.label}
              </Button>
            ))}
          </HStack>
        </Box>

        {/* Component Count Selection */}
        <Box>
          <Text mb={2} fontWeight="bold">
            Component Count:
          </Text>
          <HStack gap={2} wrap="wrap" mb={2}>
            {[2000, 5000, 10000, 20000].map((count) => (
              <Button
                key={count}
                size="sm"
                colorScheme={componentCount === count ? "purple" : "gray"}
                variant={componentCount === count ? "solid" : "outline"}
                onClick={() => setComponentCount(count)}
                disabled={isRunning}
              >
                {count.toLocaleString()}
              </Button>
            ))}
          </HStack>
          <HStack gap={2}>
            <Input
              type="number"
              value={componentCount}
              onChange={(e) => setComponentCount(Number(e.target.value))}
              w="150px"
              disabled={isRunning}
            />
            <Text fontSize="sm" color="gray.600">
              components
            </Text>
          </HStack>
        </Box>

        <Button
          colorScheme="purple"
          size="lg"
          onClick={runUIPerformanceTest}
          isLoading={isRunning}
          loadingText="Testing UI Performance..."
          disabled={isRunning}
        >
          Start UI Performance Test
        </Button>

        {isRunning && (
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="purple.600" mb={2}>
              🎨 Running UI Performance Test...
            </Text>
            <Text mb={1}>
              Testing <strong>{selectedTest}</strong> components with{" "}
              <strong>{componentCount.toLocaleString()}</strong> instances...
            </Text>
            <Text mb={1}>📊 Measuring CSS-in-JS performance...</Text>
            <Text mb={1}>
              ⚡ Processing style props and responsive breakpoints...
            </Text>
            <Text mb={2}>⏳ Please wait, this may take a moment...</Text>
            {progress && (
              <Box bg="blue.100" p={2} borderRadius="md" mb={2}>
                <Text fontSize="sm" color="blue.700" fontWeight="bold">
                  📊 {progress}
                </Text>
              </Box>
            )}
            <Box bg="purple.100" p={2} borderRadius="md">
              <Text fontSize="sm" color="purple.700">
                💡 This test measures actual Chakra UI v2 library performance
                differences
              </Text>
            </Box>
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
            <Heading size="sm" mb={3} color="purple.600">
              🎨 UI Performance Results
            </Heading>

            <VStack align="start" gap={2}>
              <Text fontSize="lg" fontWeight="bold" color="purple.600">
                <strong>Test Type:</strong>{" "}
                {testTypes.find((t) => t.id === selectedTest)?.label}
              </Text>
              <Text>
                <strong>Total Time:</strong> {testResults.totalTime.toFixed(2)}
                ms
              </Text>
              <Text>
                <strong>Render Time:</strong>{" "}
                {testResults.renderTime.toFixed(2)}ms
              </Text>
              <Text>
                <strong>Style Processing Time:</strong>{" "}
                {testResults.styleProcessingTime.toFixed(2)}ms
              </Text>
              <Text>
                <strong>Components Rendered:</strong>{" "}
                {testResults.finalComponentCount.toLocaleString()}
              </Text>
              <Text>
                <strong>Style Processing per Component:</strong>{" "}
                {(
                  testResults.styleProcessingTime /
                  testResults.finalComponentCount
                ).toFixed(4)}
                ms
              </Text>
              <Text fontSize="sm" color="gray.600">
                This tests Chakra UI v2&apos;s CSS-in-JS performance and styling
                system
              </Text>
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
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

      <VStack align="start" gap={4}>
        {/* Component Count Selection */}
        <Box>
          <Text mb={2} fontWeight="bold">
            Select Component Count:
          </Text>
          <HStack gap={2} wrap="wrap">
            {[2000, 5000, 10000, 20000].map((count) => (
              <Button
                key={count}
                size="sm"
                colorScheme={selectedCount === count ? "blue" : "gray"}
                variant={selectedCount === count ? "solid" : "outline"}
                onClick={() => setSelectedCount(count)}
                disabled={isRunning}
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

            <VStack align="start" gap={2}>
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
  const [selectedComponentType, setSelectedComponentType] =
    useState("style-heavy");

  const componentTypes = [
    { id: "style-heavy", label: "Style-Heavy", component: StyleHeavyComponent },
    { id: "responsive", label: "Responsive", component: ResponsiveComponent },
    { id: "animation", label: "Animation", component: AnimationComponent },
    { id: "form", label: "Form", component: FormComponent },
    { id: "popover", label: "Popover", component: PopoverWithState },
  ] as const;

  const addComponents = () => {
    const renderTime = measurePerformance(() => {
      setComponentCount(componentCount + 1000);
    });
    setLastRenderTime(renderTime);
  };

  const getComponentToRender = (index: number) => {
    switch (selectedComponentType) {
      case "style-heavy":
        return <StyleHeavyComponent index={index} />;
      case "responsive":
        return <ResponsiveComponent index={index} />;
      case "animation":
        return <AnimationComponent index={index} />;
      case "form":
        return <FormComponent index={index} />;
      case "popover":
        const componentData = getComponentData(index);
        return <PopoverWithState componentData={componentData} index={index} />;
      default:
        return null;
    }
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
        UI Component Flood Test
      </Heading>

      {/* Component Type Selection */}
      <Box mb={4}>
        <Text mb={2} fontWeight="bold">
          Component Type:
        </Text>
        <HStack gap={2} wrap="wrap">
          {componentTypes.map((type) => (
            <Button
              key={type.id}
              size="sm"
              colorScheme={selectedComponentType === type.id ? "blue" : "gray"}
              variant={selectedComponentType === type.id ? "solid" : "outline"}
              onClick={() => setSelectedComponentType(type.id)}
            >
              {type.label}
            </Button>
          ))}
        </HStack>
      </Box>

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
        Total components: {componentCount} | Type:{" "}
        {componentTypes.find((t) => t.id === selectedComponentType)?.label} |
        Table: {Math.ceil(Math.sqrt(componentCount))} rows ×{" "}
        {Math.ceil(componentCount / Math.ceil(Math.sqrt(componentCount)))}{" "}
        columns
      </Text>

      <Box overflowX="auto" overflowY="auto" maxH="600px">
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

                          return (
                            <td
                              key={colIndex}
                              style={{ padding: "4px", minWidth: "200px" }}
                            >
                              {getComponentToRender(componentIndex)}
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
    { id: "ui-performance", label: "🎨 UI Library Performance" },
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
          {(activeTest === "all" || activeTest === "ui-performance") && (
            <UILibraryPerformanceTest onSetComponentCount={setComponentCount} />
          )}
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
