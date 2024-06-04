import { useState } from "react";
import { Container, VStack, Button, Box, Input, Text, IconButton, Divider } from "@chakra-ui/react";
import { FaMousePointer, FaSearch, FaSitemap } from "react-icons/fa";

const Index = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [selector, setSelector] = useState("");
  const [elementTree, setElementTree] = useState(null);

  const handleElementSelect = () => {
    document.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        setSelectedElement(event.target);
      },
      { once: true },
    );
  };

  const handleSelectorInput = (event) => {
    setSelector(event.target.value);
  };

  const handleSelectorSearch = () => {
    const element = document.querySelector(selector);
    setSelectedElement(element);
  };

  const generateElementTree = (element) => {
    if (!element) return null;
    return {
      tag: element.tagName,
      children: Array.from(element.children).map(generateElementTree),
    };
  };

  const handleElementTreeView = () => {
    setElementTree(generateElementTree(document.body));
  };

  const renderElementTree = (node) => {
    if (!node) return null;
    return (
      <Box pl={4} borderLeft="1px solid" borderColor="gray.200">
        <Text>{node.tag}</Text>
        {node.children.map((child, index) => (
          <Box key={index}>{renderElementTree(child)}</Box>
        ))}
      </Box>
    );
  };

  return (
    <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} align="stretch" width="100%">
        <Button leftIcon={<FaMousePointer />} colorScheme="teal" onClick={handleElementSelect}>
          Element Selector
        </Button>
        <Divider />
        <VStack spacing={2} align="stretch">
          <Text fontSize="lg">Selection Tools</Text>
          <Input placeholder="Enter CSS Selector" value={selector} onChange={handleSelectorInput} />
          <Button leftIcon={<FaSearch />} colorScheme="teal" onClick={handleSelectorSearch}>
            Select
          </Button>
        </VStack>
        <Divider />
        <Button leftIcon={<FaSitemap />} colorScheme="teal" onClick={handleElementTreeView}>
          Element Tree View
        </Button>
        {elementTree && (
          <Box mt={4} width="100%" maxHeight="300px" overflowY="auto" border="1px solid" borderColor="gray.200" borderRadius="md" p={2}>
            {renderElementTree(elementTree)}
          </Box>
        )}
        {selectedElement && (
          <Box mt={4} p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
            <Text>Selected Element:</Text>
            <Text fontSize="sm" color="gray.600">
              {selectedElement.outerHTML}
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
