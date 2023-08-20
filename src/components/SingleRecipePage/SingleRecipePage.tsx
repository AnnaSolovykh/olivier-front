import React, { useState, useEffect } from "react";
import {
  Box,
  Collapse,
  Container,
  Icon,
  IconButton,
  Image,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
  UnorderedList
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { SavedRecipe } from "../../utils/types";
import { getSingleRecipe, deleteSingleRecipe } from "../../utils/fetchData";
import {
  ArrowBackIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon
} from "@chakra-ui/icons";
import { GiPencil, GiCalendar, GiShoppingCart } from "react-icons/gi";
import { IoTrashOutline } from "react-icons/io5";
import { TfiPrinter } from "react-icons/tfi";
import SingleRecipeIngredient from "./SingleRecipeIngredients";
import SingleRecipeTag from "./SingleRecipeTag";
import ModalForServings from "../ShoppingList/ModalForServings";

const SingleRecipePage = () => {
  const [recipe, setRecipe] = useState<SavedRecipe | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [servingSize, setServingSize] = useState(0);
  const [sendingIngredients, setSendingIngredients] = useState({});
  // const [];
  // const [openModal, setOpenModal] = useState(false);
  const { isOpen: openNutrition, onToggle } = useDisclosure();
  const { isOpen: openModal, onOpen, onClose } = useDisclosure();
  const { slug } = useParams();
  const recipeId = slug;
  const navigate = useNavigate();

  useEffect(() => {
    if (recipeId === undefined) return;
    getSingleRecipe(recipeId)
      .then(response => {
        setRecipe(response.data);
        setServingSize(response.data.recipeServings);
        setSendingIngredients(response.data.recipeIngredients);
      })
      .catch(error => {
        console.log(error);
      });
  }, [recipeId]);

  const print = () => {
    window.print();
  };

  const deleteRecipe = () => {
    if (recipeId === undefined) return;
    deleteSingleRecipe(recipeId)
      .then(response => {
        navigate("/saved-recipes");
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (recipe === null) return null;

  const valueOfServings = (e: any) => {
    console.log(e);
    // setRecipe({
    //   ...recipe,
    //   recipeServings: Number(e.target.value)
    // });
    setServingSize(Number(e.target.value));
  };
  console.log(servingSize);
  const CalculateServings = () => {
    if (recipe.recipeServings === servingSize) {
      return recipe.recipeIngredients;
    }
    if (recipe.recipeServings === 0) {
      return recipe.recipeIngredients.map(ingredient => {
        console.log(ingredient);
        return {
          ...ingredient,
          ingredientAmount: ingredient.ingredientAmount * servingSize
        };
      });
    } else {
      return recipe.recipeIngredients.map(ingredient => {
        console.log(ingredient);
        return {
          ...ingredient,
          ingredientAmount:
            (ingredient.ingredientAmount / recipe.recipeServings) * servingSize
        };
      });
    }
  };

  const SaveIngredientsToShoppingList = () => {
    CalculateServings();

    localStorage.setItem(
      "ingredient",
      JSON.stringify(recipe.recipeIngredients)
    );

    // console.log();
  };

  const nutrition = [
    {
      displayName: "Calories",
      content: recipe.recipeNutritionInfo.NutritionInfoCalories,
      unit: "kcal"
    },
    {
      displayName: "Carbohydrates",
      content: recipe.recipeNutritionInfo.NutritionInfoCarbs,
      unit: "g"
    },
    {
      displayName: "Protein",
      content: recipe.recipeNutritionInfo.NutritionInfoProtein,
      unit: "g"
    },
    {
      displayName: "Fat",
      content: recipe.recipeNutritionInfo.NutritionInfoFat,
      unit: "g"
    }
  ];

  return (
    <Container maxW="5xl">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={2} w="100%">
          <Flex marginTop="10" marginBottom="5" alignItems="center" gap={2}>
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="on the previous page"
              icon={<ArrowBackIcon />}
              title="on the previous page"
              onClick={() => {
                navigate("/saved-recipes");
              }}
            />
            <Heading size="lg">{recipe.recipeName.toUpperCase()}</Heading>
          </Flex>
          <Box>
            {recipe.recipePrepTime.recipePrepTimeMinutes > 0 && (
              <Text as="span">
                <b>Prep time:</b>&nbsp;
                {`${recipe.recipePrepTime.recipePrepTimeMinutes} min`}
                &nbsp;&nbsp;
              </Text>
            )}
            {recipe.recipeCookTime.recipeCookTimeMinutes > 0 && (
              <Text as="span">
                <b>Cooking time:</b>&nbsp;
                {`${recipe.recipeCookTime.recipeCookTimeMinutes} min`}
                &nbsp;&nbsp;
              </Text>
            )}
            {recipe.recipeTotalTime.recipeTotalTimeMinutes > 0 && (
              <Text as="span">
                <b>Total:</b>&nbsp;
                {`${recipe.recipeTotalTime.recipeTotalTimeMinutes} min`}
                &nbsp;&nbsp;
              </Text>
            )}
          </Box>
          <Text>
            <b>Complexity level:</b>&nbsp;
            {`${recipe.recipeComplexityLevel}`}
            &nbsp;&nbsp;
          </Text>
          {recipe.recipeServings > 0 && (
            <Text>
              <b>Servings:</b>&nbsp;
              {`${recipe.recipeServings}`}
              &nbsp;&nbsp;
            </Text>
          )}
        </GridItem>
        <GridItem colSpan={1} w="100%" position="relative">
          <Flex
            w="100%"
            gap="2"
            flexShrink="1"
            flexWrap="wrap"
            position="absolute"
            bottom="2"
            justifyContent="center">
            {showConfirm ? (
              <>
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Edit recipe"
                  icon={<CheckIcon />}
                  title="yes, delete the recipe"
                  onClick={deleteRecipe}
                />
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Add to menu planner"
                  icon={<CloseIcon />}
                  title="do not delete the recipe"
                  onClick={() => {
                    setShowConfirm(false);
                  }}
                />
              </>
            ) : (
              <>
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Edit recipe"
                  icon={<GiPencil />}
                  title="edit"
                  onClick={() => {
                    navigate(`/edit/${slug}`);
                  }}
                />
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Add to menu planner"
                  icon={<GiCalendar />}
                  title="add to menu planner"
                  onClick={() => {
                    navigate("/planner");
                  }}
                />
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Add to shopping list"
                  icon={<GiShoppingCart />}
                  title="add to shopping cart"
                  onClick={onOpen}
                />
                <ModalForServings
                  isOpen={openModal}
                  onClose={() => {
                    onClose();
                    setServingSize(recipe.recipeServings);
                  }}
                  value={servingSize}
                  SaveIngredientsToShoppingList={SaveIngredientsToShoppingList}
                  valueOfServings={valueOfServings}
                  // recipe={recipe}
                  // setServingSize={setServingSize}
                  // setRecipe={setRecipe}
                />
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Delete recipe"
                  icon={<IoTrashOutline />}
                  title="delete"
                  onClick={() => {
                    setShowConfirm(true);
                  }}
                />
                <IconButton
                  size="lg"
                  variant="outline"
                  aria-label="Print recipe"
                  icon={<TfiPrinter />}
                  title="print"
                  onClick={print}
                />
              </>
            )}
          </Flex>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={2} w="95%">
          <Flex flexDirection="column">
            <Box marginTop="5">
              <Heading as="h3" size="md" marginBottom="3">
                Ingredients
              </Heading>
              <UnorderedList>
                {recipe.recipeIngredients.map((ingredient, _id) => (
                  <SingleRecipeIngredient key={_id} ingredient={ingredient} />
                ))}
              </UnorderedList>
            </Box>
            <Box marginTop="5">
              <Heading as="h3" size="md" marginBottom="3">
                Instructions
              </Heading>
              <Text>{recipe.recipeInstructions}</Text>
            </Box>
            {(recipe.recipeNutritionInfo.NutritionInfoCalories !== 0 ||
              recipe.recipeNutritionInfo.NutritionInfoCarbs !== 0 ||
              recipe.recipeNutritionInfo.NutritionInfoFat !== 0 ||
              recipe.recipeNutritionInfo.NutritionInfoProtein !== 0) && (
              <Box marginTop="5">
                <Flex onClick={onToggle} cursor="pointer">
                  <Heading as="h3" size="md" marginBottom="3">
                    Nutrition Information
                  </Heading>
                  <Box as="span">
                    <Icon as={ChevronDownIcon} />
                  </Box>
                </Flex>
                <Collapse in={openNutrition} animateOpacity>
                  <Flex>
                    {nutrition.map(({ displayName, content, unit }, index) => (
                      <Box key={index}>
                        {content > 0 && (
                          <Text as="span">
                            <b>{displayName}:</b> {content}
                            {unit}&nbsp;
                          </Text>
                        )}
                      </Box>
                    ))}
                  </Flex>
                </Collapse>
              </Box>
            )}
          </Flex>
        </GridItem>
        <GridItem colSpan={1} w="100%">
          <Image w="100%" src={recipe.recipeImage} alt={recipe.recipeName} />
          <Flex marginTop="2" wrap="wrap">
            {recipe.recipeTags.map((tag, _id) => (
              <SingleRecipeTag key={_id} tag={tag} />
            ))}
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
};
export default SingleRecipePage;
