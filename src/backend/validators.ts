import { isPlainObject } from 'multiverse/is-plain-object';
import { getEnv } from 'universe/backend/env';
import { ErrorMessage, ValidationError } from 'universe/error';

import {
  getElectionsDb,
  type InternalElection,
  type NewElection,
  type NewOrPatchBallot,
  type PatchElection,
  type VoterId
} from 'universe/backend/db';

export async function validateElectionInvariants({
  opensAt,
  closesAt,
  _id,
  options
}: Partial<Pick<InternalElection, 'opensAt' | 'closesAt' | '_id' | 'options'>>) {
  const { opensAt: opensAt_, closesAt: closesAt_ } =
    (_id && (await (await getElectionsDb()).findOne({ _id }))) || {};

  opensAt ??= opensAt_;
  closesAt ??= closesAt_;

  if (opensAt! >= closesAt!) {
    throw new ValidationError(ErrorMessage.InvariantViolation('opensAt < closesAt'));
  }

  if (Array.isArray(options) && new Set(options).size !== options.length) {
    throw new ValidationError(
      ErrorMessage.InvariantViolation('options must be unique')
    );
  }
}

/**
 * Assert that `data` is of type {@link NewElection}.
 */
export function validateNewElectionData(data: unknown): asserts data is NewElection {
  validateGenericElectionData(data, { isPatchData: false });
}

/**
 * Assert that `data` is of type {@link PatchElection}.
 */
export function validatePatchElectionData(
  data: unknown
): asserts data is PatchElection {
  validateGenericElectionData(data, { isPatchData: true });
}

/**
 * Assert that `data` is of type {@link NewOrPatchBallot}.
 */
export function validateNewOrPatchBallotData(
  data: unknown
): asserts data is NewOrPatchBallot {
  validateGenericBallotData(data);
}

export function validateVoterId(data: unknown): asserts data is VoterId {
  const { MAX_VOTERID_LENGTH } = getEnv();

  if (
    typeof data !== 'string' ||
    data.length < 1 ||
    data.length > MAX_VOTERID_LENGTH
  ) {
    throw new ValidationError(
      ErrorMessage.InvalidStringLength('voter_id', 1, MAX_VOTERID_LENGTH, 'string')
    );
  }
}

// **                             **
// ** Generic validator functions **
// **                             **

function validateGenericElectionData(
  data: unknown,
  { isPatchData }: { isPatchData: false }
): asserts data is NewElection;
function validateGenericElectionData(
  data: unknown,
  { isPatchData }: { isPatchData: true }
): asserts data is PatchElection;
function validateGenericElectionData(
  data: unknown,
  { isPatchData }: { isPatchData: boolean }
): void {
  if (!isPlainObject(data)) {
    throw new ValidationError(ErrorMessage.InvalidJSON());
  }

  if (Object.keys(data).length === 0) {
    throw new ValidationError(ErrorMessage.EmptyJSONBody());
  }

  const {
    MIN_ELECTION_TITLE_LENGTH,
    MAX_ELECTION_TITLE_LENGTH,
    MAX_ELECTION_DESC_LENGTH,
    MAX_ELECTION_OPTIONS_ITEMS,
    MAX_ELECTION_OPTION_LENGTH
  } = getEnv();

  if (
    (!isPatchData || (isPatchData && data.title !== undefined)) &&
    (typeof data.title !== 'string' ||
      data.title.length < MIN_ELECTION_TITLE_LENGTH ||
      data.title.length > MAX_ELECTION_TITLE_LENGTH)
  ) {
    throw new ValidationError(
      ErrorMessage.InvalidStringLength(
        'title',
        MIN_ELECTION_TITLE_LENGTH,
        MAX_ELECTION_TITLE_LENGTH,
        'string'
      )
    );
  }

  if (
    (!isPatchData || (isPatchData && data.description !== undefined)) &&
    (typeof data.description !== 'string' ||
      data.description.length > MAX_ELECTION_DESC_LENGTH)
  ) {
    throw new ValidationError(
      ErrorMessage.InvalidStringLength(
        'description',
        0,
        MAX_ELECTION_DESC_LENGTH,
        'string'
      )
    );
  }

  if (
    (!isPatchData || (isPatchData && data.options !== undefined)) &&
    !Array.isArray(data.options)
  ) {
    throw new ValidationError(ErrorMessage.InvalidFieldValue('options'));
  }

  if (Array.isArray(data.options)) {
    if (data.options.length > MAX_ELECTION_OPTIONS_ITEMS) {
      throw new ValidationError(
        ErrorMessage.TooMany('options', MAX_ELECTION_OPTIONS_ITEMS)
      );
    }

    data.options.forEach((option: NewElection['options'][number], index) => {
      if (option.length < 1 || option.length > MAX_ELECTION_OPTION_LENGTH) {
        throw new ValidationError(
          ErrorMessage.InvalidArrayValue('options', option, index, [
            `strings of length between 1 and ${MAX_ELECTION_OPTION_LENGTH}`
          ])
        );
      }
    });
  }

  if (
    (!isPatchData || (isPatchData && data.opensAt !== undefined)) &&
    (typeof data.opensAt !== 'number' ||
      !Number.isInteger(data.opensAt) ||
      data.opensAt < 0)
  ) {
    throw new ValidationError(
      ErrorMessage.InvalidNumberValue('opensAt', 0, null, ' non-negative integer')
    );
  }

  if (
    (!isPatchData || (isPatchData && data.closesAt !== undefined)) &&
    (typeof data.closesAt !== 'number' ||
      !Number.isInteger(data.closesAt) ||
      data.closesAt < 0)
  ) {
    throw new ValidationError(
      ErrorMessage.InvalidNumberValue('closesAt', 0, null, ' non-negative integer')
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    title: _1,
    description: _2,
    options: _3,
    opensAt: _4,
    closesAt: _5,
    ...rest
  } = data;

  const restKeys = Object.keys(rest);

  if (restKeys.length !== 0) {
    throw new ValidationError(ErrorMessage.UnknownField(restKeys[0]));
  }
}

function validateGenericBallotData(data: unknown): asserts data is NewOrPatchBallot {
  if (!isPlainObject(data)) {
    throw new ValidationError(ErrorMessage.InvalidJSON());
  }

  if (Object.keys(data).length === 0) {
    throw new ValidationError(ErrorMessage.EmptyJSONBody());
  }

  const { MAX_ELECTION_OPTIONS_ITEMS, MAX_ELECTION_OPTION_LENGTH } = getEnv();

  if (!isPlainObject(data.ranking)) {
    throw new ValidationError(ErrorMessage.InvalidJSON('ranking'));
  }

  const ranking = Object.entries(data.ranking);
  const cardinality = ranking.length;

  if (cardinality < 1 || cardinality > MAX_ELECTION_OPTIONS_ITEMS) {
    throw new ValidationError(
      ErrorMessage.InvalidLength(
        'ranking',
        cardinality,
        1,
        MAX_ELECTION_OPTIONS_ITEMS
      )
    );
  }

  for (const [rankedOption, rank] of ranking) {
    if (rankedOption.length < 1 || rankedOption.length > MAX_ELECTION_OPTION_LENGTH) {
      throw new ValidationError(
        ErrorMessage.InvalidObjectKey('ranking', rankedOption, [
          `strings between 1 and ${MAX_ELECTION_OPTION_LENGTH} characters`
        ])
      );
    }

    if (
      typeof rank !== 'number' ||
      !Number.isInteger(rank) ||
      !Number.isSafeInteger(rank) ||
      rank < 0
    ) {
      throw new ValidationError(
        ErrorMessage.InvalidObjectKeyValue('ranking', rank, [
          `safe non-negative integers`
        ])
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ranking: _, ...rest } = data as NewOrPatchBallot;
  const restKeys = Object.keys(rest);

  if (restKeys.length !== 0) {
    throw new ValidationError(ErrorMessage.UnknownField(restKeys[0]));
  }
}
