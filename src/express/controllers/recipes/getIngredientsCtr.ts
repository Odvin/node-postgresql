import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv, strToInt } from '../../utils';

import * as getIngredientsDto from './schemas/getIngredientsDto.json';

import recipesService from '../../../services/recipes/RecipesService';

interface getIngredientsPayload extends Request {
  query: { type: string; lastId: string };
}

const validateGetIngredientsDto = ajv.compile(getIngredientsDto);

export async function getIngredientsCtr(
  req: getIngredientsPayload,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!validateGetIngredientsDto(req.query)) {
      return next(
        createError(422, 'Incorrect get ingredients DTO structure', {
          errors: validateGetIngredientsDto.errors,
        }),
      );
    }

    const ingredients = await recipesService.getIngredientsByType({
      ...req.query,
      lastId: strToInt(req.query.lastId),
    });

    res.json(ingredients).end();
  } catch (e) {
    return next(e);
  }
}
