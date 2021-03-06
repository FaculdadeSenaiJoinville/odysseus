import { google } from '@google-cloud/dialogflow/build/protos/protos';
import { GenericObject } from '../../../../common/types'
import { UpsertContentDTO } from '../../content/dto/create-content.dto'
import { UpsertIntentDTO } from '../../intent/dto/upsert-intent.dto'

export enum TrainingPhraseType {
	EXAMPLE = 'EXAMPLE'
}

export enum WebhookState {
	WEBHOOK_STATE_UNSPECIFIED = 'WEBHOOK_STATE_UNSPECIFIED',
	WEBHOOK_STATE_ENABLED = 'WEBHOOK_STATE_ENABLED',
	WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING = 'WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING'
}

export enum IntentPlatform {
	PLATFORM_UNSPECIFIED = 'PLATFORM_UNSPECIFIED',
	FACEBOOK = 'FACEBOOK',
	SLACK = 'SLACK',
	TELEGRAM = 'TELEGRAM',
	KIK = 'KIK',
	SKYPE = 'SKYPE',
	LINE = 'LINE',
	VIBER = 'VIBER',
	ACTIONS_ON_GOOGLE = 'ACTIONS_ON_GOOGLE',
	GOOGLE_HANGOUTS = 'GOOGLE_HANGOUTS'
}

export enum IntentImageDisplayOptions {
	IMAGE_DISPLAY_OPTIONS_UNSPECIFIED = 'IMAGE_DISPLAY_OPTIONS_UNSPECIFIED',
	GRAY = 'GRAY',
	WHITE = 'WHITE',
	CROPPED = 'CROPPED',
	BLURRED_BACKGROUND = 'BLURRED_BACKGROUND'
}

export enum IntentUrlTypeHint {
	URL_TYPE_HINT_UNSPECIFIED = 'URL_TYPE_HINT_UNSPECIFIED',
	AMP_ACTION = 'AMP_ACTION',
	AMP_CONTENT = 'AMP_CONTENT'
}

export enum IntentHorizontalAlignment {
	HORIZONTAL_ALIGNMENT_UNSPECIFIED = 'HORIZONTAL_ALIGNMENT_UNSPECIFIED',
	LEADING = 'LEADING',
	CENTER = 'CENTER',
	TRAILING = 'TRAILING'
}

export enum IntentResponseMediaType {
	RESPONSE_MEDIA_TYPE_UNSPECIFIED = 'RESPONSE_MEDIA_TYPE_UNSPECIFIED',
	AUDIO = 'AUDIO'
}

export type DialogflowCredentials = {
	type: string;
	project_id: string;
	private_key_id: string;
	private_key: string;
	client_email: string;
	client_id: string;
	client_x509_cert_url: string;
	api_key: string;
}

export type TrainingPhrasePart = {
	text: string;
	entityType?: string;
	alias?: string;
	userDefined?: boolean;
}

export type TrainingPhrase = {
	name?: string;
	type: TrainingPhraseType;
	parts: TrainingPhrasePart[];
	timesAddedCount?: number;
}

export type OutputContext = {
	name: string;
	lifespanCount?: number;
	parameters?: GenericObject;
}

export type IntentParameter = {
	name?: string;
	displayName: string;
	value?: string;
	defaultValue?: string;
	entityTypeDisplayName?: string;
	mandatory?: boolean;
	prompts?: string[];
	isList?: boolean;
}

export type IntentMessageText = {
	text: string[];
}

export type IntentImage = {
	imageUri: string;
	accessibilityText: string;
}

export type QuickReplies = {
	title: string;
	quickReplies: string[];
}

export type IntentButton = {
	text: string;
	postback: string;
}

export type IntentMessageCard = {
	title: string;
	subtitle: string;
	imageUri: string;
	buttons: IntentButton[];
}

export type IntentMessageSimpleResponse = {
	textToSpeech: string;
	ssml: string;
	displayText: string;
}

export type IntentMessageSimpleResponses = {
	simpleResponses: IntentMessageSimpleResponse[];
}

export type IntentBasicCard = {
	title: string;
	subtitle: string;
	formattedText: string;
	image: IntentImage;
	buttons: IntentButton[];
}

export type IntentSuggestion = {
	title: string;
}

export type IntentSuggestions = {
	suggestions: IntentSuggestion[];
}

export type LinkOutSuggestion = {
	destinationName: string;
	uri: string;
}

export type IntentSelectItemInfo = {
	key: string;
	synonyms: string[];
}

export type IntentItem = {
	info: IntentSelectItemInfo;
	title: string;
	description: string;
	image: IntentImage;
}

export type IntentListSelect = {
	title: string;
	items: IntentItem[];
	subtitle: string;
}

export type IntentCarouselSelect = {
	items: IntentItem[];
}

export type IntentOpenUrlAction = {
	url: string;
	urlTypeHint: IntentUrlTypeHint;
}

export type IntentBrowseCarouselCardItem = {
	openUriAction: IntentOpenUrlAction;
	title: string;
	description: string;
	image: IntentImage;
	footer: string;
}

export type IntentBrowseCarouselCard = {
	items: IntentBrowseCarouselCardItem[];
	imageDisplayOptions: IntentImageDisplayOptions;
}

export type IntentColumnProperty = {
	header: string;
	horizontalAlignment: IntentHorizontalAlignment;
}

export type IntentTableCardCell = {
	text: string;
}

export type IntentTableCardRow = {
	cells: IntentTableCardCell[];
	dividerAfter: boolean;
}

export type IntentTableCard = {
	title: string;
	subtitle: string;
	image: IntentImage;
	columnProperties: IntentColumnProperty[];
	rows: IntentTableCardRow[];
	buttons: IntentButton[];
}

export type IntentResponseMediaObject = {
	name: string;
	description: string;
	contentUrl: string;
	largeImage: IntentImage;
	icon: IntentImage;
}

export type IntentMediaContent = {
	mediaType: IntentResponseMediaType;
	mediaObjects: IntentResponseMediaObject[];
}

export type IntentMessage = {
	platform: IntentPlatform;
	text?: IntentMessageText;
	image?: IntentImage;
	quickReplies?: QuickReplies;
	card?: IntentMessageCard;
	payload?: GenericObject;
	simpleResponses?: IntentMessageSimpleResponses;
	basicCard?: IntentBasicCard;
	suggestions?: IntentSuggestions;
	linkOutSuggestion?: LinkOutSuggestion;
	listSelect?: IntentListSelect;
	carouselSelect?: IntentCarouselSelect;
	browseCarouselCard?: IntentBrowseCarouselCard;
	tableCard?: IntentTableCard;
	mediaContent?: IntentMediaContent;
}

export type IntentFollowupIntentInfo = {
	followupIntentName: string;
	parentFollowupIntentName: string;
}

export class Intent {
	public name?: string;

	public displayName: string;

	public webhookState?: WebhookState;

	public priority?: number;

	public isFallback?: boolean;

	public mlDisabled?: boolean;

	public liveAgentHandoff?: boolean;

	public endInteraction?: boolean;

	public inputContextNames?: string[];

	public events?: string[];

	public trainingPhrases?: TrainingPhrase[];

	public action?: string;

	public outputContexts?: OutputContext;

	public resetContexts?: boolean;

	public parameters?: IntentParameter[];

	public messages?: IntentMessage[];

	public defaultResponsePlatforms?: IntentPlatform[];

	public rootFollowupIntentName?: string;

	public parentFollowupIntentName?: string;

	public followupIntentInfo?: IntentFollowupIntentInfo[];

	constructor(body: UpsertIntentDTO, messages: IntentMessage[]) {

		const { name, training_phrases, priority, end_interaction } = body;

		this.displayName = name;
		this.priority = priority || 50000;
		this.endInteraction = end_interaction || false;
		this.trainingPhrases = training_phrases.map(trainingPhrase => {

			return {
				type: TrainingPhraseType.EXAMPLE,
				parts: [{
					text: trainingPhrase
				}]
			};
		});
		this.messages = messages;
		this.resetContexts = false;
		this.mlDisabled = false;
		this.webhookState = WebhookState.WEBHOOK_STATE_UNSPECIFIED;
	}
}

export type QueryInputText = {
	text: string;
	languageCode: string;
}

export type QueryInput = {
	text: QueryInputText;
}

export type DialogflowRequest = {
	session: string;
	queryInput: QueryInput;
}

export type MessageData = {
	language_code: string;
	message: string;
	session_id: string;
};

export type DialogflowResponse = {
	user_message: string;
	bot_response: string[];
	parameters: google.protobuf.IStruct;
}
