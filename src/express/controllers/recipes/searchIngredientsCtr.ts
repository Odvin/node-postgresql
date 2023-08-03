import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv, strToInt } from '../../utils';

import * as searchIngredientsDto from './schemas/searchIngredientsDto.json';

import recipesService from '../../../services/recipes/RecipesService';

interface searchIngredientsPayload extends Request {
  query: { term: string; page: string };
}

const validateGetIngredientsDto = ajv.compile(searchIngredientsDto);

export async function searchIngredientsCtr(
  req: searchIngredientsPayload,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!validateGetIngredientsDto(req.query)) {
      return next(
        createError(422, 'Incorrect search ingredients DTO structure', {
          errors: validateGetIngredientsDto.errors,
        }),
      );
    }

    const ingredients = await recipesService.searchIngredients({
      ...req.query,
      page: strToInt(req.query.page),
    });

    res.json(ingredients).end();
  } catch (e) {
    return next(e);
  }
}
